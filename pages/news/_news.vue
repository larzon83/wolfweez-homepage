<template>
	<section>
		<NewsDetail :news="story.content" :time="$_niceDate(story.created_at)" />
	</section>
</template>

<script>
import NewsDetail from '~/components/NewsDetail.vue'
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	components: {
		NewsDetail
	},
	mixins: [useFormatting, useStorybridge],

	head() {
		const title = `${this.story.content.headline} | News`
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
			path: `/news/${context.params.news}`
		})
	}
}
</script>
