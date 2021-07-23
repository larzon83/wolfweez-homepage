<template>
	<section>
		<ul class="flex py-6 mb-6">
			<li
				v-for="news in newsAll"
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
					<h5>{{ $_niceDate(news.created_at) }}</h5>
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
import { sbData } from '~/utils'
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
			startsWith: 'news/',
			sortBy: 'created_at:desc'
		})

		const newsMeta = newsDir.stories.filter(item => {
			return item.is_startpage
		})

		const newsAll = newsDir.stories.filter(item => {
			return !item.is_startpage
		})

		return {
			newsAll,
			metaDescription: newsMeta[0].content.description_meta
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.NEWS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
