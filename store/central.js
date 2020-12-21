export const state = () => ({
	currentPageTitle: ''
})

export const mutations = {
	SET_PAGETITLE(state, title) {
		state.currentPageTitle = title
	},

	RESET_PAGETITLE(state) {
		state.currentPageTitle = ''
	}
}
