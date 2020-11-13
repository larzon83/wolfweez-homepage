export const state = () => ({
	festivalDate: '',
	festivalFlyer: '',
	festivalDescription: '',
	festivals: []
})

export const getters = {
	// make sure, we have at least 2 "config"-stories
	// -> first one is the current festival
	// -> all after that are historical festivals
	hasHistory(state) {
		if (
			state.festivals.length &&
			state.festivals.length > 1 &&
			state.festivals[1].slug
		) {
			return true
		} else {
			return false
		}
	}
}

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
				// console.log('res.data:', res.data.stories)
				commit('SET_CONFIG2', res.data.stories)
			})
	}
}
