<template>
	<section>
		<h1 class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold">
			{{ pageTitle }}
		</h1>
		<ImgGalleries :galleries="festivalsWithGalleries" />
	</section>
</template>

<script>
import { mapState } from 'vuex'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.MEDIEN__FOTOGALERIE.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.story.content.image_social?.filename,
			this.$route.path
		)

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
		...mapState(['festivalsWithGalleries'])
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.MEDIEN__FOTOGALERIE }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
