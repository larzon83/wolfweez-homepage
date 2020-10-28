const fs = require('fs')
const nodeHtmlToImage = require('node-html-to-image')

const dir = './static/og-images'

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir)
}

const createImages = async content => {
	await nodeHtmlToImage({
		content,
		html: `<html>
			<head>
				<style>
					body {
						width: 1280px;
						height: 600px;
					}
				</style>
			</head>
			<body>Hello {{name}}!</body>
		</html>
		`
	}).then(() => console.log('images were created successfully!'))
}

const tmp = [
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

const content = []
let count = 1

for (let route of tmp) {
	// remove slashes from beginning and end
	if (route.substr(0, 1) === '/') {
		const newRoute = route.substr(1)
		route = newRoute
	}

	if (route.substr(-1) === '/') {
		const newRoute = route.substr(0, route.length - 1)
		route = newRoute
	}

	// console.log('route:', route)

	// const splitted = route.split('/')
	// console.log('splitted:', splitted)

	// ;(async () => {
	// 	try {
	// 		await createImage({ title: route, output: count.toString() })
	// 	} catch (e) {
	// 		console.log('e:', e)
	// 	}
	// })()

	// createImage({ title: route, output: count.toString() })

	content.push({
		name: route,
		output: `${dir}/${count.toString()}.png`
	})

	count++
}

createImages(content)
