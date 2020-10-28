import axios from 'axios'

// export default function () {
// 	this.nuxt.hook('build:before', async context => {
// 		const { data } = await axios.get(
// 			`https://api.storyblok.com/v1/cdn/stories?is_startpage=true&starts_with=historie/&sort_by=slug:desc&token=${process.env.STORYBLOK_TOKEN}`
// 		)
// 		console.log('axios:', data)
// 	})
// }

export default async function (moduleOptions) {
	const { data } = await axios.get(
		`https://api.storyblok.com/v1/cdn/stories?is_startpage=true&starts_with=historie/&sort_by=slug:desc&token=${process.env.STORYBLOK_TOKEN}`
	)
	console.log('axios:', data.stories[0].slug)

	const netlifyToml = {
		redirects: [
			{
				from: '/line-up/',
				to: '/line-up/bands/',
				force: true
			},
			{
				from: '/historie/',
				// to: '/historie/2019/',
				to: '/historie/2018/', // FIXME:
				force: true
			}
		],
		plugins: [
			{
				package: '@netlify/plugin-sitemap',
				inputs: {
					changeFreq: 'daily',
					priority: 0.5,
					// Append missing trailing slash to pretty URL
					trailingSlash: true,
					exclude: [
						// './dist/200.html',
						// '**/historie/index.html',
						// '**/line-up/index.html',
						// '**/**/200.html'
						'./historie/index.html',
						'./line-up/index.html',
						'./**/200.html'
					]
				}
			}
		]
	}

	this.requireModule([
		'@nuxtjs/netlify-files',
		{
			copyExistingFiles: false,
			netlifyToml
		}
	])
}
