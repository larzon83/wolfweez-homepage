<template>
	<BasicPage :content="story.content" />
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = this.story.content.headline

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.story.content.image_social?.filename,
			this.$route.path
		)

		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
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
