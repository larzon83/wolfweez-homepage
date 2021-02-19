<template>
	<section></section>
</template>

<script>
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.RECHTLICHES.title

export default {
	name: pageTitle,

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
		redirect(301, routeMeta.RECHTLICHES__AGB.to)
	}
}
</script>
