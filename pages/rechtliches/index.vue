<template>
	<section></section>
</template>

<script>
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'Rechtliches',

	head() {
		const title = 'Rechtliches'
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
		redirect(301, '/rechtliches/agb/')
	}
}
</script>
