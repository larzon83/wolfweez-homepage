export const state = () => ({
	crumbs: [],
	currentPageTitle: '',
	showPlayTimes: true
})

export const mutations = {
	SET_CRUMBS(state, crumbs) {
		state.crumbs = crumbs
	},

	RESET_CRUMBS(state) {
		state.crumbs = []
	},

	SET_PAGETITLE(state, title) {
		state.currentPageTitle = title
	},

	RESET_PAGETITLE(state) {
		state.currentPageTitle = ''
	}
}
