import { siteTitle } from './constants'

export const getInfoRedirect = infos => {
	let to = '/'
	let title = 'Infos'

	if (infos.length) {
		to = '/infos/'

		const infoAllgemein = infos.filter(info => info.slug === 'allgemein')

		if (infoAllgemein.length) {
			title = infoAllgemein[0].content.headline
			to += 'allgemein/'
		} else {
			title = infos[0].content.headline
			to += infos[0].slug + '/'
		}
	}

	return {
		title,
		rule: {
			from: '/infos/',
			to,
			force: true
		}
	}
}

// for use in nuxt.config.js
export const getInitialStoryblokData = async (client, version) => {
	// get main festival-config -> extract main meta-description
	const { data: config } = await client.get('cdn/stories/config', {
		version
	})

	// get all history years -> most recend one will be used in netlify redirects
	const { data: historyYears } = await client.get('cdn/stories', {
		starts_with: 'historie/',
		is_startpage: 1,
		sort_by: 'slug:desc',
		version
	})

	const historyRedirect = {
		from: '/historie/',
		to: `/historie/${historyYears.stories[0].slug}/`,
		force: true
	}

	// get all info-pages
	const { data: infoPages } = await client.get('cdn/stories', {
		starts_with: 'infos/',
		is_startpage: 0,
		version
	})

	const infoRedirect = getInfoRedirect(infoPages.stories)

	// get all bands, even the ones in historie folders
	const { data: allBands } = await client.get('cdn/stories', {
		filter_query: {
			component: {
				in: 'band'
			}
		},
		version
	})

	// get bands of the current festival
	const { data: activeBands } = await client.get('cdn/stories', {
		starts_with: 'line-up/bands/',
		is_startpage: 0,
		version
	})

	// find out, which bands are in historie folder and need a redirect
	// -> all available bands - current active bands = 'old' bands
	const filteredBandsRedirects = allBands.stories.filter(band => {
		const active = activeBands.stories.filter(item => item.uuid === band.uuid)
		return !active.length
	})

	// create redirects of 'old' bands for netlify redirects
	const bandsRedirects = filteredBandsRedirects.map(item => {
		const to = item.full_slug.substr(0, 14) // -> eg "/historie/2019/"
		return {
			from: `/line-up/bands/${item.slug}`,
			to: `/${to}`,
			force: true
		}
	})

	return {
		bandsRedirects,
		historyRedirect,
		infoRedirect,
		metaDescription: config.story.content.description_meta || siteTitle.long
	}
}
