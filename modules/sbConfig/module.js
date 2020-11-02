import StoryblokClient from 'storyblok-js-client'

// import fse from 'fs-extra'
// const { resolve } = require('path')

export default async function (moduleOptions) {
	const client = new StoryblokClient({
		accessToken: process.env.STORYBLOK_TOKEN
	})

	const { data } = await client.get('cdn/stories/config', {
		version:
			process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true' ? 'draft' : 'published'
		// starts_with: 'historie/',
		// is_startpage: 1,
		// sort_by: 'slug:desc'
	})
	console.log('data:', data)

	// const srcFile = resolve(this.options.srcDir, 'netlify.toml')

	// const contentRaw = fse.readFileSync(srcFile, 'UTF-8')

	// const regEx = /(to = "\/historie\/)(\w+)(\/")/i

	// if (!contentRaw.match(regEx)) {
	// 	throw new Error('netlifyTomlUpdater: regular Expression failed')
	// }

	// const contentNew = contentRaw.replace(regEx, `$1${data.stories[0].slug}$3`)

	// fse.writeFileSync(srcFile, contentNew, 'UTF-8')
}
