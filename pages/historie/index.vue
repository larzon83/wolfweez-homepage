<template>
	<section>
		<TabsHistory />
	</section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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

	computed: {
		...mapGetters('config', ['hasHistory']),

		...mapState('config', ['festivals'])
	},

	// route to the latest history on page-load
	created() {
		const destination = this.hasHistory ? this.festivals[1].slug + '/' : '/'
		this.$router.push(destination)
	}
}
</script>
