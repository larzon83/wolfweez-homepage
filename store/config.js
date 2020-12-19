import { getInfoRedirect, sortAssetsByName } from '~/utils'

export const state = () => ({
	festivals: [],
	infos: [],
	infoRedirect: '/'
})

export const mutations = {
	SET_CONFIGS(state, payload) {
		payload.forEach(item => {
			if (item.content.gallery.length > 0) {
				item.content.gallery = sortAssetsByName(item.content.gallery)
			}
		})
		state.festivals = payload
	},

	SET_INFOS(state, payload) {
		state.infoRedirect = getInfoRedirect(payload).to
		state.infos = payload.map(info => {
			return {
				full_slug: info.full_slug,
				title: info.content.headline
			}
		})
	}
}

export const getters = {
	currentFestival(state) {
		return state.festivals.filter(item => {
			return !item.is_startpage
		})[0]
	},

	historicFestivals(state) {
		return state.festivals.filter(item => {
			return item.is_startpage
		})
	}
}

export const actions = {
	loadConfigs({ commit }, { version }) {
		return this.$storyapi
			.get(`cdn/stories`, {
				filter_query: {
					component: {
						in: 'config'
					}
				},
				sort_by: 'is_startpage:asc,slug:desc',
				version
			})
			.then(res => {
				commit('SET_CONFIGS', res.data.stories)
			})
	},

	loadInfos({ commit }, { version }) {
		return this.$storyapi
			.get(`cdn/stories`, {
				starts_with: 'infos/',
				is_startpage: 0,
				version
			})
			.then(res => {
				commit('SET_INFOS', res.data.stories)
			})
	}
}
