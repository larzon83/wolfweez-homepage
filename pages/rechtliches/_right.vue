<template>
	<section class="right">
		<BasicPage :content="story.content" />
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
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
		const result = await sbData({
			ctx: context,
			path: `/rechtliches/${context.params.right}`
		})

		const crumbs = [
			{ ...routeMeta.RECHTLICHES },
			{
				title: result?.story.content.headline,
				to: slashify(`${routeMeta.RECHTLICHES.to}${context.params.right}`)
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...result }
	},

	computed: {
		pageTitle() {
			return this.story.content.headline
		}
	}
}
</script>
