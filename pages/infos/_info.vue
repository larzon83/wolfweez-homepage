<template>
	<section>
		<TabsNavigation :type="tabType" />
		<BlokContent :content="story.content" />
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useStorybridge],

	head() {
		const title = `${this.story.content.headline} | Infos`
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
		return await sbData({
			ctx: context,
			path: `/infos/${context.params.info}`
		})
	},

	computed: {
		pageTitle() {
			return this.story.content.headline
		}
	}
}
</script>
