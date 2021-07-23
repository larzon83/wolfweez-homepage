<template>
	<section></section>
</template>

<script>
import { routeMeta, tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.INFOS.title

export default {
	name: 'InfosOverview',

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

	// redirect to calculated "main" info-page
	// NOTE: in code, the "main" info-page is defined as "allgemein"
	// - if someone renames or deletes this page in sb, it will use the top-most info-page in sb
	// - if there are no info-pages at all in sb, "/" will be used
	middleware({ redirect, store }) {
		redirect(301, store.state.redirects[tabTypes.INFOS].to)
	}
}
</script>
