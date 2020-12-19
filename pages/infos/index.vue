<template>
	<section></section>
</template>

<script>
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

	// redirect to calculated "main" info-page
	// NOTE: in code, the "main" info-page is defined as "allgemein"
	// - if someone renames or deletes this page in sb, it will use the top-most info-page in sb
	// - if there are no info-pages at all in sb, "/" will be used
	middleware({ redirect, store }) {
		redirect(301, store.state.config.infoRedirect)
	}
}
</script>
