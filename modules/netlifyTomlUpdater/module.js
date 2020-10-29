import axios from 'axios'
import fse from 'fs-extra'
const { resolve } = require('path')

export default async function (moduleOptions) {
	const { data } = await axios.get(
		`https://api.storyblok.com/v1/cdn/stories?is_startpage=true&starts_with=historie/&sort_by=slug:desc&token=${process.env.STORYBLOK_TOKEN}`
	)

	let val = data.stories[0].slug
	val = 'fuckup'

	const srcFile = resolve(this.options.srcDir, 'netlify.toml')

	const contentRaw = fse.readFileSync(srcFile, 'UTF-8')

	const regEx = /(to = "\/historie\/)(\w+)(\/")/i

	if (!contentRaw.match(regEx)) {
		throw new Error('netlifyTomlUpdater: regular Expression failed')
	}

	const contentNew = contentRaw.replace(regEx, `$1${val}$3`)

	fse.writeFileSync(srcFile, contentNew, 'UTF-8')

	// const netlifyToml = {
	// 	redirects: [
	// 		{
	// 			from: '/line-up/',
	// 			to: '/line-up/bands/',
	// 			force: true
	// 		},
	// 		{
	// 			from: '/historie/',
	// 			to: '/historie/2019/',
	// 			force: true
	// 		}
	// 	],
	// 	plugins: [
	// 		{
	// 			package: '@netlify/plugin-sitemap',
	// 			inputs: {
	// 				changeFreq: 'daily',
	// 				priority: 0.5,
	// 				// Append missing trailing slash to pretty URL
	// 				trailingSlash: true,
	// 				exclude: [
	// 					// './dist/200.html',
	// 					// '**/historie/index.html',
	// 					// '**/line-up/index.html',
	// 					// '**/**/200.html'
	// 					'./historie/index.html',
	// 					'./line-up/index.html',
	// 					'./**/200.html'
	// 				]
	// 			}
	// 		}
	// 	]
	// }

	// this.requireModule([
	// 	'@nuxtjs/netlify-files',
	// 	{
	// 		copyExistingFiles: false,
	// 		netlifyToml
	// 	}
	// ])
}
