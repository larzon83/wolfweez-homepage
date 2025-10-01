import { getSubNavRedirect, sortAssetsByName, sbData, slashify } from '~/utils'
import { routeMeta, tabTypes } from '~/utils/constants'

export const state = () => ({
	contentFetched: false,
	currentFestival: {},
	festivalsWithGalleries: [],
	// historicFestivals: [],
	mainSponsors: {},
	// navItemsMain: [...mainNavItems],
	subNavItems: {
		[tabTypes.INFOS]: [],
		[tabTypes.HISTORY]: [],
		[tabTypes.LINEUP]: [
			{ ...routeMeta.LINEUP__BANDS, slug: 'bands' },
			{ ...routeMeta.LINEUP__TIMETABLE, slug: 'timetable' }
		]
	},
	redirects: {
		[tabTypes.INFOS]: {},
		[tabTypes.HISTORY]: {}
	},
	showLyaBuyButton: false,
	showWinterspecialBuyButton: true,
	showRookieDayBuyButton: false
})

export const getters = {
	latestGallery(state) {
		return state.festivalsWithGalleries.length
			? state.festivalsWithGalleries[0]
			: undefined
	}
}

export const mutations = {
	SET_CONTENT_FETCHED(state) {
		state.contentFetched = true
	},

	SET_CONTENT(state, payload) {
		// ::: handle infos :::
		const subInfosAll = payload.infos.map(info => {
			return {
				slug: info.slug,
				to: slashify(info.full_slug),
				title: info.content.headline
			}
		})

		const subInfosWithoutTesting = subInfosAll.filter(i => i.slug !== 'testing')

		const subInfos =
			process.env.NUXT_ENV_STORYBLOK_PREVIEW !== 'true'
				? subInfosWithoutTesting
				: subInfosAll

		state.subNavItems[tabTypes.INFOS] = subInfos

		const infoRedirect = getSubNavRedirect(subInfos)
		state.redirects[tabTypes.INFOS] = infoRedirect

		// --------------------------------------------------------------

		// ::: handle configs :::
		payload.configs.forEach(item => {
			if (item.content.gallery.length > 0) {
				item.content.gallery = sortAssetsByName(item.content.gallery)
			}
		})

		const festivalsWithGalleries = payload.configs.filter(
			item => item.content.gallery.length > 0
		)
		state.festivalsWithGalleries = festivalsWithGalleries.map(festival => {
			return {
				slug: festival.slug,
				year: festival.content.year,
				imgs: festival.content.gallery
			}
		})

		const currentFestival = payload.configs.find(item => !item.is_startpage)
		const historicFestivals = payload.configs.filter(item => item.is_startpage)
		state.currentFestival = currentFestival
		// state.historicFestivals = historicFestivals

		const subHistory = historicFestivals.map(festival => {
			return {
				slug: festival.slug,
				to: slashify(festival.full_slug),
				title: festival.content.year
			}
		})
		state.subNavItems[tabTypes.HISTORY] = subHistory

		const historyRedirect = getSubNavRedirect(subHistory)
		state.redirects[tabTypes.HISTORY] = historyRedirect

		// --------------------------------------------------------------

		// ::: update main nav with redirects :::
		// const getNavItemAtIndex = itemTo => {
		// 	return mainNavItems.findIndex(item => item.to === itemTo)
		// }

		// const indexInfo = getNavItemAtIndex(routeMeta.INFOS.to)
		// const indexHistorie = getNavItemAtIndex(routeMeta.HISTORIE.to)

		// state.navItemsMain[indexInfo] = {
		// 	title: routeMeta.INFOS.title,
		// 	to: infoRedirect.to
		// }
		// state.navItemsMain[indexHistorie] = {
		// 	title: routeMeta.HISTORIE.title,
		// 	to: historyRedirect.to
		// }
	},

	SET_MAIN_SPONSORS(state, payload) {
		state.mainSponsors = payload
	}
}

export const actions = {
	async nuxtServerInit({ dispatch }, ctx) {
		await dispatch('loadContent', ctx)
	},

	async nuxtClientInit({ dispatch, state }, ctx) {
		if (!state.contentFetched) {
			await dispatch('loadContent', ctx)
		}
	},

	async loadContent({ commit }, ctx) {
		const configs = await sbData({
			ctx,
			filterQuery: {
				component: {
					in: 'config'
				}
			},
			sortBy: 'is_startpage:asc,slug:desc'
		})

		const infos = await sbData({
			ctx,
			startsWith: 'infos/',
			isStartpage: 0
		})

		const mainSponsors = await sbData({
			ctx,
			path: '/sponsoren/haupt',
			isStartpage: 0
		})

		commit('SET_CONTENT_FETCHED')
		commit('SET_CONTENT', { configs: configs.stories, infos: infos.stories })
		commit('SET_MAIN_SPONSORS', mainSponsors)
	}
}
