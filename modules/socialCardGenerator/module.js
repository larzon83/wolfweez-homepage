import StoryblokClient from 'storyblok-js-client'
import { slashify } from './../../utils'
import {
	dashifyPath,
	ogImagesDir,
	removeSlashesFromStartAndEnd
} from './../../utils/seo'

const { resolve } = require('path')
const fs = require('fs-extra')
const nodeHtmlToImage = require('node-html-to-image')

let isTest = false
if (process.env.NODE_ENV === 'production') isTest = false

const hookName = isTest ? 'build:before' : 'generate:done'
const dirStatic = `./static/${ogImagesDir}`
let dir = dirStatic
let nuxtGeneratedRoutes = [
	'/',
	'/fotogalerie/',
	'/historie/',
	'/infos/',
	'/kontakt/',
	'/line-up/',
	'/news/',
	'/rechtliches/',
	'/sponsoren/',
	'/tickets/',
	'/line-up/bands/',
	'/line-up/timetable/',
	'/infos/allgemein/',
	'/infos/testing/',
	'/infos/anreise/',
	'/infos/faq/',
	'/historie/2019/',
	'/historie/2018/',
	'/rechtliches/agb/',
	'/rechtliches/datenschutz/',
	'/rechtliches/impressum/',
	'/news/wolfweez-openair-festival-auf-2022-verschoben/',
	'/news/dolle-news/',
	'/news/early-wolf-aktion-2021-endet/',
	'/news/third-one/',
	'/news/second-news/',
	'/news/first-news-ever/',
	'/news/ab-sofort-early-wolf-tickets-2021-verfuegbar/',
	'/news/wolfweez-festival-paket-2021-erhaeltlich/',
	'/line-up/bands/grave-digger/',
	'/line-up/bands/voltbeat/',
	'/line-up/bands/brainstorm/',
	'/line-up/bands/the-prophecy-23/',
	'/line-up/bands/motoerbloeck/',
	'/line-up/bands/vulgar-display-of-cover/',
	'/line-up/bands/venues/',
	'/line-up/bands/endless-decay/'
]

const imageSrc = resolve(
	__dirname,
	'wolfweez-open-air-festival_og-background.png'
)
const image = fs.readFileSync(imageSrc)
// eslint-disable-next-line new-cap
const base64Image = new Buffer.from(image).toString('base64')
const bgImage = 'data:image/png;base64,' + base64Image

const htmlTemplateSrc = resolve(__dirname, 'html-template.html')
const htmlTemplate = fs.readFileSync(htmlTemplateSrc, 'UTF-8')

const createImages = async content => {
	await nodeHtmlToImage({
		content,
		puppeteerArgs: { args: ['--no-sandbox'] },
		html: htmlTemplate
	}).then(() =>
		console.log('\u001B[32m✔\u001B[0m successfully created social card images')
	)
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
				nuxtGeneratedRoutes = await Array.from(context.generatedRoutes)
			}

			const client = new StoryblokClient({
				accessToken: process.env.STORYBLOK_TOKEN
			})

			const allStories = await client.getAll('cdn/stories', {
				version:
					process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
						? 'draft'
						: 'published'
			})

			const storiesWithSocialImage = allStories.filter(
				item =>
					item.path !== '/' &&
					(item.content?.image_social?.filename ||
						(item.content.component === 'band' &&
							item.content?.image?.filename))
			)

			const socialRoutes = storiesWithSocialImage.map(item => {
				const path = item.path || item.full_slug
				return slashify(path)
			})

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir)
			}

			const finalRoutes = nuxtGeneratedRoutes.filter(route => {
				if (route === '/') return false

				const hasSocialImage = socialRoutes.find(
					socialRoute => socialRoute === route
				)
				if (hasSocialImage) return false

				return route
			})

			const content = []

			for (const routeRaw of finalRoutes) {
				let bodyClass = ''
				let subline = ''
				let headline = ''
				const route = removeSlashesFromStartAndEnd(routeRaw)
				const outputFilePath = dashifyPath(route)
				const splitted = route.split('/')

				const story = allStories.find(item => item.full_slug === route)

				if (splitted.length > 1) {
					headline = splitted[1].toUpperCase()
					if (splitted[0] === 'historie') subline = splitted[0].toUpperCase()
					if (splitted[0] === 'news' && splitted[1]) {
						bodyClass = 'is-news'
						headline = story.content.headline || splitted[1]
						subline = splitted[0].toUpperCase()
					}
					if (splitted[1] === 'bands' && splitted[2]) {
						headline =
							story.content.name.toUpperCase() || splitted[2].toUpperCase()
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
