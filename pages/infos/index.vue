<template>
	<section>
		<!-- <TabsNavigation :type="tabType" /> -->
	</section>
</template>

<script>
import { mapState } from 'vuex'
import { tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'Infos',

	head() {
		const title = 'Infos'
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
		...mapState('config', ['infoRedirect'])
	},

	// route to calculated "main" info-page on page-load
	// NOTE: in code, the "main" info-page is defined as "allgemein"
	// - if someone renames or deletes this page in sb, it will use the top-most info-page in sb
	// - if there are no info-pages at all in sb, "/" will be used
	created() {
		this.$router.push(this.infoRedirect.to)
	}
}
</script>
