<template>
	<section>
		<LineupTabs />
		<BandDetail :band="story.content" :time="time" />
	</section>
</template>

<script>
import BandDetail from '~/components/BandDetail.vue'
import useStorybridge from '~/mixins/useStorybridge.js'
import { niceTime, sbData } from '~/utils'

export default {
	components: {
		BandDetail
	},
	mixins: [useStorybridge],

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

		for (const day of timetable.story.content.entry) {
			let found = false

			for (const slot of day.entry) {
				if (slot.band === band.story.uuid) {
					found = true
					time = niceTime(slot.time_start, slot.time_end)
					break
				}
			}

			if (found) {
				break
			}
		}

		// band expands to -> story: { content: {} }
		return { ...band, time }
	}
}
</script>
