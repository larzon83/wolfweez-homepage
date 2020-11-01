<template>
	<section>
		<TabsLineup />
		<BandDetail :band="band" :time="time" />
	</section>
</template>

<script>
import BandDetail from '~/components/BandDetail.vue'
import useStorybridge from '~/mixins/useStorybridge.js'
import { getPlayTime, sbData } from '~/utils'
import { createSEOMeta } from '~/utils/seo'

export default {
	components: {
		BandDetail
	},
	mixins: [useStorybridge],

	head() {
		const title = `${this.band.name} | Bands`
		return {
			title,
			meta: createSEOMeta({
				description: this.band.description_meta,
				image: this.band.image.filename,
				imageAlt: title,
				title,
				url: this.$route.path
			})
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

		return {
			band: band.story.content,
			time
		}
	}
}
</script>
