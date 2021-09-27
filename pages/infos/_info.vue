<template>
	<section>
		<StoryblokBlokContent
			v-if="story.content.component === 'info'"
			:content="story.content"
		/>
		<StoryblokBlokSimpleOrFaq
			v-else-if="story.content.component === 'info_simple'"
			:content="story.content"
		/>
		<StoryblokBlokMap
			v-else-if="story.content.component === 'info_map'"
			:content="story.content"
		/>
	</section>
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
		const title = `${this.story.content.headline} | ${routeMeta.INFOS.title}`

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
			path: `/infos/${context.params.info}`
		})

		const crumbs = [
			{ ...routeMeta.INFOS },
			{
				title: result?.story.content.headline,
				to: slashify(`${routeMeta.INFOS.to}${context.params.info}`)
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...result }
	},

	computed: {
		pageTitle() {
			return this.story.content.headline
		}
	},

	middleware({ redirect, params }) {
		if (
			process.env.NUXT_ENV_STORYBLOK_PREVIEW !== 'true' &&
			params.info === 'testing'
		) {
			redirect(301, '/')
		}
	}
}
</script>
