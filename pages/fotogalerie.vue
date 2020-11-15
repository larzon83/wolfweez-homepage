<template>
	<section>
		<h1>Fotogalerie</h1>
		<ImgGalleries :galleries="galleries" />
	</section>
</template>

<script>
import { mapState } from 'vuex'
import { sbData } from '~/utils'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'Fotogalerie',

	head() {
		const title = 'Fotogalerie'
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
	}
}
</script>
