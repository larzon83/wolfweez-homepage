// const puppeteer = require('puppeteer-serverless').default
// const renderSocialImage = require('puppeteer-social-image').default

// import puppeteer from 'puppeteer-serverless'
import renderSocialImage from 'puppeteer-social-image'

const createImage = async ({ title = 'Hey', output = '' } = {}) => {
	// let outputImage = './static/og-images/'
	let outputImage = ''
	outputImage += output === '' ? 'image.png' : `${output}.png`

	return await renderSocialImage.default({
		template: 'article',
		templateParams: {
			imageUrl:
				'https://images.unsplash.com/photo-1557958114-3d2440207108?w=1950&q=80',
			title,
			subtitle: 'Historie'
		},
		output: outputImage,
		size: 'facebook'
		// browser: await puppeteer.launch({
		// 	executablePath:
		// 		'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
		// })
	})

	// return new Promise(resolve => {
	// 	resolve()
	// })
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

	;(async () => {
		try {
			await createImage({ title: route, output: count.toString() })
		} catch (e) {
			console.log('e:', e)
		}
	})()

	// createImage({ title: route, output: count.toString() })

	count++
}
