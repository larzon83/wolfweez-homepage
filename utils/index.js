import { routeMeta } from './constants'

// Get Data From Storyblok
export const sbData = ({
	ctx,
	isStartpage = null,
	filterQuery = null,
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
			filter_query: filterQuery,
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

export const slashify = (path, { startSlash = true } = {}) => {
	let slash1 = ''
	if (startSlash) slash1 = path.substr(0, 1) !== '/' ? '/' : ''

	const slash2 = path.substr(-1) !== '/' ? '/' : ''
	return slash1 + path + slash2
}

const redirectUsesFullslugOrTo = obj => {
	const destination = obj.to || obj.full_slug
	return destination || '/'
}

export const getSubNavRedirect = navItems => {
	const to = navItems.length
		? slashify(redirectUsesFullslugOrTo(navItems[0]))
		: '/'
	return {
		from: routeMeta.HISTORIE.to,
		to,
		force: true
	}
}

export const getNiceDate = date => {
	const splitted = date.substr(0, 10).split('-')
	return `${splitted[2]}.${splitted[1]}.${splitted[0]}`
}

/**
 *
 * @param {String} timeStart
 * @param {String} timeEnd
 * @returns {String}
 */
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

// -> if imgs in sb are manually ordered, this seems to take precedence
export const sortAssetsByName = gallery => {
	if (!gallery || !gallery.length) return []

	return gallery.sort((a, b) => {
		const sorted = getAssetFilename(a.filename) - getAssetFilename(b.filename)
		return gallery.indexOf(sorted)
	})
}

export const getNewsSorted = newsAll => {
	const newsEnriched = newsAll.map(item => {
		let newsDate = item.created_at
		if (item.content.custom_date) {
			newsDate = item.content.custom_date.replace(' ', 'T') + ':00.000Z'
		} else if (item.first_published_at) {
			newsDate = item.first_published_at
		}
		return {
			...item,
			newsDate: getNiceDate(newsDate),
			newsDateTimestamp: new Date(newsDate).getTime()
		}
	})

	return newsEnriched.sort((a, b) => {
		if (a.newsDateTimestamp < b.newsDateTimestamp) return 1
		if (a.newsDateTimestamp > b.newsDateTimestamp) return -1
		return 0
	})
}
