export const state = () => ({
	festivals: []
})

export const mutations = {
	SET_CONFIG(state, payload) {
		state.festivals = payload
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
	// loadConfig_OLD({ commit }, { version }) {
	// 	return this.$storyapi
	// 		.get(`cdn/stories/config`, {
	// 			version
	// 		})
	// 		.then(res => {
	// 			commit('SET_CONFIG', res.data.story.content)
	// 		})
	// },

	loadConfig({ commit }, { version }) {
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
				commit('SET_CONFIG', res.data.stories)
			})
	}
}
