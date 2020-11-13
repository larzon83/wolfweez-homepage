export const state = () => ({
	festivalDate: '',
	festivalFlyer: '',
	festivalDescription: '',
	festivals: []
})

export const mutations = {
	SET_CONFIG(state, payload) {
		state.festivalDate = payload.date
		state.festivalFlyer = payload.flyer
		state.festivalDescription = payload.description_meta
	},

	SET_CONFIG2(state, payload) {
		state.festivals = payload
	}
}

export const getters = {
	historicFestivals(state) {
		return state.festivals.filter(item => {
			return item.is_startpage
		})
	}
}

export const actions = {
	loadConfig({ commit }, { version }) {
		return this.$storyapi
			.get(`cdn/stories/config`, {
				version
			})
			.then(res => {
				commit('SET_CONFIG', res.data.story.content)
			})
	},

	loadConfig2({ commit }, { version }) {
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
				commit('SET_CONFIG2', res.data.stories)
			})
	}
}
