<template>
	<section></section>
</template>

<script>
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

	// redirect to the latest historic festival
	middleware({ redirect, store }) {
		const historicFestivals = store.getters['config/historicFestivals']
		const destination = historicFestivals.length
			? '/' + historicFestivals[0].full_slug
			: '/'
		redirect(301, destination)
	}
}
</script>
