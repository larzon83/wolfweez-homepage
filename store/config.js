export const state = () => ({
	festivalDate: '',
	festivalFlyer: ''
})

export const mutations = {
	SET_CONFIG(state, payload) {
		state.festivalDate = payload.date
		state.festivalFlyer = payload.flyer.filename
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
