// Get Data From Storyblok -> for use with asyncData
export const sbData = ({ ctx, path = '', resolve = '', startsWith = '' }) => {
	const version =
		ctx.query._storyblok ||
		ctx.isDev ||
		process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
			? 'draft'
			: 'published'

	return ctx.app.$storyapi
		.get(`cdn/stories${path}`, {
			resolve_relations: resolve,
			starts_with: startsWith,
			version
		})
		.then(res => {
			// console.log('res.data:', res.data)
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

export const niceTime = (timeStart, timeEnd) => {
	if (timeStart === '') return 'TBA'

	let time = formatTime(timeStart)

	if (timeEnd !== '') time += ' – ' + formatTime(timeEnd)

	return time
}

export const formatTime = dateRaw => {
	const splitted = dateRaw.split(' ')
	return splitted[1]
}
