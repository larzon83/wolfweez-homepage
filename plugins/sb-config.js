export default async ({ app, isDev, query }, inject) => {
	const version =
		query._storyblok ||
		isDev ||
		process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
			? 'draft'
			: 'published'

	const { data } = await app.$storyapi.get('cdn/stories/config', {
		version
	})
	console.log('data:', data.story.content)

	inject('sbConfig', data.story.content)
}
