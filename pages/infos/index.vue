<template>
	<section></section>
</template>

<script>
import { sbData } from '~/utils'
import { getInfoRedirect } from '~/utils/initialStoryblokData'
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

	async asyncData(context) {
		const infoPages = await sbData({
			ctx: context,
			startsWith: 'infos/',
			isStartpage: 0
		})

		const infoRedirect = getInfoRedirect(
			infoPages.stories.map(info => info.slug)
		)

		return { infoRedirect }
	},

	// route to calculated "main" info-page on page-load
	// NOTE: in code, the "main" info-page is defined as "allgemein"
	// - if someone renames or deletes this page in sb, it will use the top-most info-page in sb
	// - if there are no info-pages in sb, "/" will be used
	created() {
		this.$router.push(this.infoRedirect.to)
	}
}
</script>
