<template>
	<section>
		<h1 class="d-none d-lg-flex">{{ pageTitle }}</h1>
		<ul class="flex py-6 mb-6">
			<li
				v-for="news in newsSorted"
				:key="news.content._uid"
				class="flex-auto px-6"
				style="min-width: 33%"
			>
				<nuxt-link
					v-if="news.content"
					:to="$_slashify(news.full_slug)"
					class="article-teaser block py-4 px-6 border rounded border-gray-500"
				>
					<h2 class="pt-2 pb-4 text-2xl font-bold">
						{{ news.content.headline }}
					</h2>
					<h5>{{ news.newsDate }}</h5>
					<rich-text-renderer
						v-if="news.content.description_short"
						:document="news.content.description_short"
					/>
				</nuxt-link>
			</li>
		</ul>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { getNiceDate, sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.NEWS.title

export default {
	name: 'NewsOverview',
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				description: this.metaDescription,
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			pageTitle
		}
	},

	async asyncData(context) {
		const newsDir = await sbData({
			ctx: context,
			startsWith: 'news/'
		})

		const newsMeta = newsDir.stories.find(item => {
			return item.is_startpage
		})

		const newsAll = newsDir.stories
			.filter(item => !item.is_startpage)
			.map(item => {
				let newsDate = item.created_at
				if (item.content?.custom_date) {
					newsDate = item.content.custom_date.replace(' ', 'T') + ':00.000Z'
				} else if (item.first_published_at) {
					newsDate = item.first_published_at
				}
				return {
					...item,
					newsDate: getNiceDate(newsDate),
					newsDateTimestamp: new Date(newsDate).getTime()
				}
			})

		const newsSorted = newsAll.sort((a, b) => {
			if (a.newsDateTimestamp < b.newsDateTimestamp) return 1
			if (a.newsDateTimestamp > b.newsDateTimestamp) return -1
			return 0
		})

		return {
			newsSorted,
			metaDescription: newsMeta?.content?.description_meta
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.NEWS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
