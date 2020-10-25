export default async function ({ isDev, query, store }) {
	if (!store.state.config.date) {
		const version =
			query._storyblok ||
			isDev ||
			process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
				? 'draft'
				: 'published'

		await store.dispatch('config/loadConfig', { version })
	}
}
