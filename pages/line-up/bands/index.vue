<template>
	<v-row tag="section">
		<v-col
			v-for="band in bandsAll"
			:key="band.content._uid"
			cols="12"
			md="6"
			xl="4"
		>
			<v-card
				v-if="band.content"
				:ripple="false"
				:to="$_slashify(band.full_slug)"
				color="darkish"
				flat
				height="100%"
				href
				nuxt
				class="hover-card"
			>
				<v-card-text class="pt-2 pb-4">
					<h2 class="text-body-1 news-title text-center">
						{{ band.content.name }}
					</h2>
				</v-card-text>
				<SbImage
					v-if="band.content.image && band.content.image.filename"
					:alt="band.content.name"
					:pic="band.content.image"
					:preset="$config.presetNames.BAND_OVERVIEW"
					:position="$_shiftImagePositionY(band.content.image_offset)"
				/>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.LINEUP__BANDS.title

export default {
	name: 'BandsOverview',
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.metaImage,
			this.$route.path
		)

		const linkEntries = []
		const preloadImage = this.$_getPreloadImageHeadEntry(
			this.bandsAll[0].content.image?.filename,
			this.$config.presetNames.BAND_OVERVIEW
		)
		if (preloadImage) linkEntries.push(preloadImage)

		return {
			title,
			meta: createSEOMeta({
				description: this.metaDescription || title,
				image,
				imageAlt: title,
				imageHeight,
				title,
				url: this.$route.path
			}),
			link: [...linkEntries]
		}
	},

	data() {
		return {
			pageTitle
		}
	},

	async asyncData(context) {
		const bandsDir = await sbData({
			ctx: context,
			startsWith: 'line-up/bands/'
		})

		const bandsMeta = bandsDir.stories.find(item => item.is_startpage)
		const bandsAll = bandsDir.stories.filter(item => !item.is_startpage)

		return {
			bandsAll,
			metaDescription: bandsMeta?.content?.description_meta,
			metaImage: bandsMeta?.content?.image_social?.filename
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.LINEUP }, { ...routeMeta.LINEUP__BANDS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/__partials/_hover-card.scss';

.hover-card .news-title {
	line-height: 1.8125rem; // 29px
}
</style>
