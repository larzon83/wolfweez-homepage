<template>
	<section>
		<h1>Fotogalerie</h1>
		<ImgGalleries :galleries="galleries" />
	</section>
</template>

<script>
import { mapState } from 'vuex'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { sbData } from '~/utils'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Fotogalerie'

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex],

	head() {
		const title = pageTitle
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
			pageTitle
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/fotogalerie'
		})
	},

	computed: {
		...mapState('config', ['festivals']),

		galleries() {
			const festivalsWithGalleries = this.festivals.filter(
				festival => festival.content.gallery.length > 0
			)
			return festivalsWithGalleries.map(festival => {
				return {
					year: festival.content.year,
					imgs: festival.content.gallery
				}
			})
		}
	},

	middleware({ store }) {
		const crumbs = [
			{
				title: pageTitle,
				to: '/fotogalerie/'
			}
		]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
