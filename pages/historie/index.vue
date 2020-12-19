<template>
	<section>
		<TabsNavigation :type="tabType" />
	</section>
</template>

<script>
import { mapGetters } from 'vuex'
import { tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'HistoryOverview',

	head() {
		const title = 'Historie'
		return {
			title,
			meta: createSEOMeta({
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			tabType: tabTypes.HISTORY
		}
	},

	computed: {
		...mapGetters('config', ['historicFestivals'])
	},

	// redirect to the latest historic festival
	created() {
		const destination = this.historicFestivals.length
			? '/' + this.historicFestivals[0].full_slug
			: '/'
		this.$router.push(destination)
	}
	// middleware({ redirect, store }) {
	// 	const historicFestivals = store.getters['config/historicFestivals']
	// 	const destination = historicFestivals.length
	// 		? '/' + historicFestivals[0].full_slug
	// 		: '/'
	// 	redirect(301, destination)
	// }
}
</script>
