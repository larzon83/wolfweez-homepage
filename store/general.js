export const state = () => ({
	moreClicked: false
})

export const mutations = {
	SET_MORE(state) {
		state.moreClicked = true
	},

	RESET_MORE(state) {
		state.moreClicked = false
	}
}
