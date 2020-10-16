// Get Data From Storyblok -> for use with asyncData
export const sbData = ({ ctx, path = '', startsWith = '' }) => {
	const version =
		ctx.query._storyblok ||
		ctx.isDev ||
		process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
			? 'draft'
			: 'published'

	return ctx.app.$storyapi
		.get(`cdn/stories${path}`, {
			starts_with: startsWith,
			version
		})
		.then(res => {
			return res.data
		})
		.catch(res => {
			if (!res.response) {
				console.error(res)
				ctx.error({
					statusCode: 404,
					message: 'Failed to receive content form api'
				})
			} else {
				console.error(res.response.data)
				ctx.error({
					statusCode: res.response.status,
					message: res.response.data
				})
			}
		})
}
