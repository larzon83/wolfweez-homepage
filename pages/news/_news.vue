<template>
	<section>
		<div class="pb-4">
			<nuxt-link :to="newsOverviewRoute" class="on-hover">
				<v-icon size="15" color="prime" class="mr-1">$arrowLeft</v-icon>alle
				News
			</nuxt-link>
		</div>
		<NewsDetail :news="story.content" :time="newsDate" />
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { getNiceDate, sbData, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useStorybridge],

	head() {
		const title = `${this.story.content.headline} | ${routeMeta.NEWS.title}`
		return {
			title,
			meta: createSEOMeta({
				description:
					this.story.content.description_meta ||
					this.story.content.description_short,
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
