<template>
	<section v-editable="story.content">
		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ story.content.headline }}
		</h1>

		<!-- intro text -->
		<rich-text-renderer
			v-if="story.content.text"
			:document="story.content.text"
		/>

		<!-- rental properties -->
		<div
			v-for="(rentalProperty, index) in story.content.rental_properties"
			:key="index"
		>
			<v-divider class="my-5" />

			<h2 v-if="rentalProperty.headline" class="mb-2">
				{{ rentalProperty.headline }}
			</h2>

			<rich-text-renderer
				v-if="rentalProperty.text"
				:document="rentalProperty.text"
			/>

			<!-- TODO: rename rentalProperty.gallery -> rentalProperty.gallery_images -->
			<LightGalleries
				v-if="
					rentalProperty.id &&
					rentalProperty.gallery &&
					rentalProperty.gallery.length
				"
				:id="`mieten-gallery-${rentalProperty.id}`"
				:galleries="[{ imgs: rentalProperty.gallery }]"
				:gallery-title="
					rentalProperty.gallery_title ||
					`Wolfweez ${rentalProperty.headline} mieten`
				"
				hide-headline
				class="mt-8 mb-8"
			/>
		</div>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'PageMieten',
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = this.story.content.headline

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

	async asyncData(context) {
		const result = await sbData({
			ctx: context,
			path: '/mieten'
		})

		const crumbs = [
			{
				title: result?.story.content.headline || routeMeta.MIETEN.title,
				to: routeMeta.MIETEN.to
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...result }
	},

	computed: {
		pageTitle() {
			return this.story.content.headline
		}
	}
}
</script>

<style lang="scss" scoped></style>
