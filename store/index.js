import { sbData } from '~/utils'

export const state = () => ({
	contentFetched: false,
	mainSponsors: {}
})

export const mutations = {
	SET_CONTENT_FETCHED(state) {
		state.contentFetched = true
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
		const mainSponsors = await sbData({
			ctx,
			path: '/sponsoren/haupt',
			isStartpage: 0
		})

		commit('SET_MAIN_SPONSORS', mainSponsors)
		commit('SET_CONTENT_FETCHED')
	}
}
