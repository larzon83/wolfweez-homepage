const fs = require('fs-extra')
const nodeHtmlToImage = require('node-html-to-image')

export const isTest = false

const hookName = isTest ? 'build:before' : 'generate:done'
const dirStatic = './static/og-images'
let dir = dirStatic
// let allRoutes = ['/line-up/bands/']
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

const createImages = async content => {
	await nodeHtmlToImage({
		content,
		puppeteerArgs: { args: ['--no-sandbox'] },
		html: `<html>
			<head>
				<style>
					body {
						width: 1280px;
						height: 600px;
					}
				</style>
			</head>
			<body>{{name}}</body>
		</html>
		`
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
			dir = context.options.generate.dir + '/og-images'
			allRoutes = await Array.from(context.generatedRoutes)
		}

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}

		const content = []

		// TODO: create a fallback image
		for (const routeRaw of allRoutes) {
			let route = routeRaw
			let addToContent = true

			if (route.substr(0, 1) === '/') {
				route = route.substr(1)
			}

			if (route.substr(-1) === '/') {
				route = route.substr(0, route.length - 1)
			}

			let output = route

			const splitted = route.split('/')

			if (splitted[0] === '' || (splitted[1] === 'bands' && splitted[2])) {
				addToContent = false
			} else if (splitted.length > 1) {
				const splitted2 = route.split('/')
				route = splitted2[1]
				output = splitted2.join('-')
			}

			if (addToContent) {
				content.push({
					name: route.toUpperCase(),
					output: `${dir}/${output}.png`
				})
			}
		}

		await createImages(content)
	})
}
