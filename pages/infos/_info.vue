<template>
	<section>
		<TabsNavigation :type="tabType" />
		<StoryblokBlokContent :content="story.content" />
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { routeMeta, tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useStorybridge],

	head() {
		const title = `${this.story.content.headline} | ${routeMeta.INFOS.title}`
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

	data() {
		return {
			tabType: tabTypes.INFOS
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
				title: result.story.content.headline,
				to: `${routeMeta.INFOS.to}${context.params.info}/`
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
