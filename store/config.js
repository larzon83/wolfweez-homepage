export const state = () => ({
	festivalDate: '',
	festivalFlyer: '',
	festivalDescription: ''
})

export const mutations = {
	SET_CONFIG(state, payload) {
		state.festivalDate = payload.date
		state.festivalFlyer = payload.flyer
		state.festivalDescription = payload.description_meta
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
	}
}
