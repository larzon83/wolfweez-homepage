import { routeMeta } from './constants'

// Get Data From Storyblok
export const sbData = ({
	ctx,
	isStartpage = null,
	path = '',
	resolveLinks = null,
	resolveRelations = null,
	sortBy = null,
	startsWith = ''
}) => {
	const version =
		ctx.query._storyblok ||
		ctx.isDev ||
		process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true'
			? 'draft'
			: 'published'

	return ctx.app.$storyapi
		.get(`cdn/stories${path}`, {
			is_startpage: isStartpage,
			resolve_links: resolveLinks,
			resolve_relations: resolveRelations,
			sort_by: sortBy,
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

export const getInfoRedirect = infos => {
	let to = '/'

	if (infos.length) {
		to = routeMeta.INFOS.to

		const infoAllgemein = infos.filter(info => info.slug === 'allgemein')

		if (infoAllgemein.length) {
			to += 'allgemein/'
		} else {
			to += infos[0].slug + '/'
		}
	}

	return {
		from: routeMeta.INFOS.to,
		to,
		force: true
	}
}

export const getNiceDate = date => {
	const splitted = date.substr(0, 10).split('-')
	return `${splitted[2]}.${splitted[1]}.${splitted[0]}`
}

export const getPlayTime = (timeStart, timeEnd) => {
	if (timeStart === '') return 'TBA'

	let time = formatTime(timeStart)

	if (timeEnd !== '') time += ' – ' + formatTime(timeEnd)

	return time
}

export const formatTime = dateRaw => {
	const splitted = dateRaw.split(' ')
	return splitted[1]
}

export const getAssetFilename = url => {
	return url.substring(url.lastIndexOf('/') + 1)
}

// FIXME: seems not to work always
// -> if imgs in sb are manually ordered, this seems to take precedence
export const sortAssetsByName = gallery => {
	if (!gallery || !gallery.length) return []

	return gallery.sort((a, b) => {
		const sorted = getAssetFilename(a.filename) - getAssetFilename(b.filename)
		return gallery.indexOf(sorted)
	})
}
