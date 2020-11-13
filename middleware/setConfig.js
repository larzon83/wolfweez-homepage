export default async function ({ isDev, query, store }) {
	if (!store.state.config.festivals.length) {
		const version =
			query._storyblok ||
			isDev ||
			process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
				? 'draft'
				: 'published'

		await store.dispatch('config/loadConfig', { version })
		await store.dispatch('config/loadConfig2', { version })
	}
}
