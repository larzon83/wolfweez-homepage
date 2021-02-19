<template>
	<section>
		<TabsNavigation :type="tabType" />
		<BandDetail :band="story.content" :time="time" />
	</section>
</template>

<script>
import BandDetail from '~/components/BandDetail.vue'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { getPlayTime, sbData } from '~/utils'
import { routeMeta, tabTypes } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	components: {
		BandDetail
	},
	mixins: [savePagetitleToVuex, useStorybridge],

	head() {
		const title = `${this.story.content.name} | ${routeMeta.LINEUP__BANDS.title}`
		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image: this.story.content.image.filename,
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			tabType: tabTypes.LINEUP
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

		let time = ''

		if (band) {
			for (const day of timetable.story.content.entry) {
				let found = false

				for (const slot of day.entry) {
					if (slot.band.id === band.story.uuid) {
						found = true
						time = getPlayTime(slot.time_start, slot.time_end)
						break
					}
				}

				if (found) {
					break
				}
			}
		}

		const crumbs = [
			{ ...routeMeta.LINEUP },
			{ ...routeMeta.LINEUP__BANDS },
			{
				title: band.story.content.name,
				to: `${routeMeta.LINEUP__BANDS.to}${context.params.slug}/`
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...band, time }
	},

	computed: {
		pageTitle() {
			return this.story.content.name
		}
	}
}
</script>
