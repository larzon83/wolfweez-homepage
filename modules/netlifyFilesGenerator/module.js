import StoryblokClient from 'storyblok-js-client'

import fse from 'fs-extra'
const { resolve } = require('path')

export default async function (moduleOptions) {
	if (process.env.NODE_ENV === 'production') {
		const client = new StoryblokClient({
			accessToken: process.env.STORYBLOK_TOKEN
		})

		const { data } = await client.get('cdn/stories', {
			starts_with: 'historie/',
			is_startpage: 1,
			sort_by: 'slug:desc'
		})

		const srcFile = resolve(this.options.srcDir, 'netlify.toml')

		const contentRaw = fse.readFileSync(srcFile, 'UTF-8')

		const regEx = /(to = "\/historie\/)(\w+)(\/")/i

		if (!contentRaw.match(regEx)) {
			throw new Error('netlifyFilesGenerator: regular Expression failed')
		}

		const contentNew = contentRaw.replace(regEx, `$1${data.stories[0].slug}$3`)

		fse.writeFileSync(srcFile, contentNew, 'UTF-8')
	}

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

	if (process.env.NUXT_ENV_IS_SPA === 'true') {
		this.requireModule([
			'@nuxtjs/netlify-files',
			{
				copyExistingFiles: true,
				existingFilesDirectory: resolve(__dirname, 'files')
			}
		])
	}
}
