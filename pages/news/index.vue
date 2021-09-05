<template>
	<v-row>
		<v-col
			v-for="news in newsSorted"
			:key="news.content._uid"
			cols="12"
			lg="6"
			xl="4"
		>
			<NewsCard :news="news" />
		</v-col>
	</v-row>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { getNewsSorted, sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.NEWS.title

export default {
	name: 'NewsOverview',
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.metaImage,
			this.$route.path
		)

		return {
			title,
			meta: createSEOMeta({
				description: this.metaDescription || title,
				image,
				imageAlt: title,
				imageHeight,
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

		const newsMeta = newsDir.stories.find(item => item.is_startpage)
		const newsAll = newsDir.stories.filter(item => !item.is_startpage)

		return {
			newsSorted: getNewsSorted(newsAll),
			metaDescription: newsMeta?.content?.description_meta,
			metaImage: newsMeta?.content?.image_social?.filename
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.NEWS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
