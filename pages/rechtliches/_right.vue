<template>
	<section>
		<ContentSimple :content="story.content" />
	</section>
</template>

<script>
import ContentSimple from '~/components/ContentSimple.vue'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	components: {
		ContentSimple
	},
	mixins: [savePagetitleToVuex, useStorybridge],

	head() {
		const title = this.story.content.headline
		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: `/rechtliches/${context.params.right}`
		})
	},

	computed: {
		pageTitle() {
			return this.story.content.headline
		}
	}
}
</script>
