<template>
	<section>
		<GoBackHeader :route="newsOverviewRoute" label="alle News" />
		<NewsDetail :news="story.content" :news-date="newsDate" />
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { getNiceDate, sbData, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = `${this.story.content.headline} | ${routeMeta.NEWS.title}`
		let image
		let imageHeight

		if (this.story.content.image?.filename) {
			const ogImage = this.$_generateOgImageEntry(
				this.story.content.image.filename
			)
			image = ogImage.image
			imageHeight = ogImage.imageHeight
		} else {
			image = createOgImagePath(this.$route.path)
		}

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
