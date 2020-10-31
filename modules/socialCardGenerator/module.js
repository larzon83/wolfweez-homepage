import StoryblokClient from 'storyblok-js-client'
import { ogImagesDir, removeSlashesFromStartAndEnd } from './../../utils/seo'

const { resolve } = require('path')
const fs = require('fs-extra')
const nodeHtmlToImage = require('node-html-to-image')

let isTest = false
if (process.env.NODE_ENV === 'production') isTest = false

const hookName = isTest ? 'build:before' : 'generate:done'
const dirStatic = `./static/${ogImagesDir}`
let dir = dirStatic
let allRoutes = [
	'/historie/',
	'/line-up/',
	'/news/',
	'/line-up/bands/',
	'/line-up/timetable/',
	'/',
	'/line-up/bands/brainstorm/',
	'/line-up/bands/grave-digger/',
	'/line-up/bands/foobar/',
	'/line-up/bands/the-prophecy-23/',
	'/line-up/bands/voltbeat/',
	'/line-up/bands/super-duper/',
	'/news/third-one/',
	'/news/second-news/',
	'/news/first-news-ever/',
	'/historie/2019/',
	'/historie/2018/'
]

const imageSrc = resolve(
	__dirname,
	'wolfweez-open-air-festival_og-background.png'
)
const image = fs.readFileSync(imageSrc)
// eslint-disable-next-line new-cap
const base64Image = new Buffer.from(image).toString('base64')
const bgImage = 'data:image/jpeg;base64,' + base64Image

const htmlTemplateSrc = resolve(__dirname, 'html-template.html')
const htmlTemplate = fs.readFileSync(htmlTemplateSrc, 'UTF-8')

const createImages = async content => {
	await nodeHtmlToImage({
		content,
		puppeteerArgs: { args: ['--no-sandbox'] },
		html: htmlTemplate
		// html: `<html>
		// 	<head>
		// 		<style>
		// 			body {
		// 				width: 1200px;
		// 				height: 630px;
		// 			}
		// 		</style>
		// 	</head>
		// 	<body><h1>{{headline}}</h1><h5>{{subline}}</h5></body>
		// </html>
		// `
	}).then(() => console.log('successfully created social card images!'))
}

export default function () {
	// remove og-images dir from static dir
	// only used for testing
	if (fs.existsSync(dirStatic)) {
		fs.removeSync(dir)
	}

	this.nuxt.hook(hookName, async context => {
		if (!isTest) {
			dir = `${context.options.generate.dir}/${ogImagesDir}`
			allRoutes = await Array.from(context.generatedRoutes)
		}

		const client = new StoryblokClient({
			accessToken: process.env.STORYBLOK_TOKEN
		})

		const { data } = await client.get('cdn/stories', {
			starts_with: 'news/',
			is_startpage: 0,
			sort_by: 'created_at:desc'
		})

		const newsData = data.stories.map(item => {
			return {
				slug: item.slug,
				headline: item.content.headline
			}
		})

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}

		const finalRoutes = allRoutes.filter(route => {
			const splitted = route.split('/')
			if (splitted[2] === 'bands' && splitted[3]) return false
			if (route === '/') return false
			return route
		})

		const content = []

		for (const routeRaw of finalRoutes) {
			let bodyClass = ''
			let subline = ''
			let headline = ''
			const route = removeSlashesFromStartAndEnd(routeRaw)
			const outputFilePath = route.replace('/', '-')
			const splitted = route.split('/')

			if (splitted.length > 1) {
				headline = splitted[1].toUpperCase()
				if (splitted[0] === 'historie') subline = splitted[0].toUpperCase()
				if (splitted[0] === 'news') {
					subline = splitted[0].toUpperCase()
					bodyClass = 'is-news'
					const headlineFromStoryblok = newsData.filter(news => {
						return news.slug === splitted[1]
					})
					headline = headlineFromStoryblok[0].headline
				}
			} else {
				headline = route.toUpperCase()
			}

			content.push({
				headline,
				subline,
				bgImage,
				bodyClass,
				output: `${dir}/${outputFilePath}.png`
			})
		}

		await createImages(content)
	})
}
