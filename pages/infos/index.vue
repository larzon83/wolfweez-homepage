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

	middleware({ redirect, store }) {
		redirect(301, store.state.redirects[tabTypes.INFOS].to)
	}
}
</script>
