// ..................................................................... //
// NOTE: each page needs to have a property 'pageTitle' in its data-object!
// ..................................................................... //
import { mapMutations } from 'vuex'

export default {
	created() {
		if (process.client) {
			this.SET_PAGETITLE(this.pageTitle)
		}
	},

	// beforeDestroy() {
	// 	this.RESET_PAGETITLE()
	// },

	methods: {
		...mapMutations('central', ['SET_PAGETITLE', 'RESET_PAGETITLE'])
	}
}
