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
	'/infos/',
	'/line-up/',
	'/kontakt/',
	'/rechtliches/',
	'/newsletter/',
	'/historie/',
	'/news/',
	'/fotogalerie/',
	'/line-up/bands/',
	'/line-up/timetable/',
	'/rechtliches/agb/',
	'/rechtliches/impressum/',
	'/rechtliches/datenschutz/',
	'/news/third-one/',
	'/infos/allgemein/',
	'/infos/anreise/',
	'/news/second-news/',
	'/news/first-news-ever/',
	'/line-up/bands/grave-digger/',
	'/historie/2019/',
	'/line-up/bands/super-duper/',
	'/line-up/bands/brainstorm/',
	'/line-up/bands/foobar/',
	'/line-up/bands/voltbeat/',
	'/historie/2018/',
	'/line-up/bands/the-prophecy-23/'
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
	}).then(() => console.log('✔ successfully created social card images'))
}

export default function () {
	// remove og-images dir from static dir
	// only used for testing
	if (fs.existsSync(dirStatic)) {
		fs.removeSync(dir)
	}

	if (process.env.NUXT_ENV_IS_SPA !== 'true') {
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
}
