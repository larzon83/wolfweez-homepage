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

export default {
	components: {
		NewsDetail
	},
	mixins: [useFormatting, useStorybridge],

	head() {
		return {
			title: `${this.story.content.headline} | News`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.story.content.description_meta
				}
			]
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
