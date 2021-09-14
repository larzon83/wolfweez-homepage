<template>
	<section>
		<GoBackHeader :route="newsOverviewRoute" label="alle News" />
		<NewsDetail :news="story.content" :news-date="newsDate" />
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { getNiceDate, sbData, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = `${this.story.content.headline} | ${routeMeta.NEWS.title}`

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.story.content.image_social?.filename,
			this.$route.path
		)

		const linkEntries = []
		const preloadImage = this.$_getPreloadImageHeadEntry(
			this.story.content.image_social?.filename,
			this.$config.presetNames.NEWS_DETAIL
		)
		if (preloadImage) linkEntries.push(preloadImage)

		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
				title,
				url: this.$route.path
			}),
			link: [...linkEntries]
		}
	},

	async asyncData(context) {
		const result = await sbData({
			ctx: context,
			path: `/news/${context.params.news}`
		})

		const newsDate = getNiceDate(
			result.story.content.custom_date ||
				result.story.first_published_at ||
				result.story.created_at
		)

		const crumbs = [
			{ ...routeMeta.NEWS },
			{
				title: result?.story.content.headline,
				to: slashify(`${routeMeta.NEWS.to}${context.params.news}`)
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...result, newsDate }
	},

	computed: {
		pageTitle() {
			return this.story.content.headline
		}
	},

	created() {
		this.newsOverviewRoute = routeMeta.NEWS.to
	}
}
</script>
