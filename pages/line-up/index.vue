<template>
	<section></section>
</template>

<script>
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.LINEUP.title

export default {
	name: 'LineUp',

	head() {
		const title = pageTitle
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

	middleware({ redirect }) {
		redirect(301, routeMeta.LINEUP__BANDS.to)
	}
}
</script>
