<template>
	<section>
		<GoBackHeader :route="bandsOverviewRoute" label="alle Bands" />
		<BandDetail
			:band="story.content"
			:play-day="playDay"
			:play-time="playTime"
		/>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { getPlayTime, sbData, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = `${this.story.content.name} | ${routeMeta.LINEUP__BANDS.title}`

		const ogImage =
			this.story.content.image_social?.filename ||
			this.story.content.image?.filename ||
			undefined

		const { image, imageHeight } = this.$_generateOgImageEntry(
			ogImage,
			this.$route.path
		)

		const linkEntries = []
		const preloadImage = this.$_getPreloadImageHeadEntry(
			this.story.content.image?.filename,
			this.$config.presetNames.BAND_DETAIL
		)
		if (preloadImage) linkEntries.push(preloadImage)

		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
				title,
				url: this.$route.path
			}),
			link: [...linkEntries]
		}
	},

	async asyncData(context) {
		const band = await sbData({
			ctx: context,
			path: `/line-up/bands/${context.params.slug}`
		})

		const timetable = await sbData({
			ctx: context,
			path: '/line-up/timetable'
		})

		let playDay
		let playTime

		if (band) {
			for (const day of timetable.story.content.entry) {
				let found = false

				for (const slot of day.entry) {
					if (slot.band.id === band.story.uuid) {
						found = true
						playDay = day.day_display_name
						playTime = getPlayTime(slot.time_start, slot.time_end)
						break
					}
				}

				if (found) break
			}
		}

		const crumbs = [
			{ ...routeMeta.LINEUP },
			{ ...routeMeta.LINEUP__BANDS },
			{
				title: band?.story.content.name,
				to: slashify(`${routeMeta.LINEUP__BANDS.to}${context.params.slug}`)
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...band, playDay, playTime }
	},

	computed: {
		pageTitle() {
			return this.story.content.name
		}
	},

	created() {
		this.bandsOverviewRoute = routeMeta.LINEUP__BANDS.to
	}
}
</script>
