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

	// route to the latest history on page-load
	created() {
		const destination = this.historicFestivals.length
			? this.historicFestivals[0].slug + '/'
			: '/'
		this.$router.push(destination)
	}
}
</script>
