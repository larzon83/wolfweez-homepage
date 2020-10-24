<template>
	<section>
		<LineupTabs />
		<v-row class="timetable">
			<v-col
				v-for="day in story.content.entry"
				:key="day._uid"
				v-editable="day"
				cols="6"
				class="day"
			>
				<h2>
					{{ day.day_display_name }}
				</h2>
				<div>
					{{ $_niceDate(day.day) }}
				</div>
				<br />
				<br />
				<br />

				<div
					v-for="slot in day.entry"
					:key="slot._uid"
					v-editable="slot"
					class="slot"
				>
					TIME: {{ $_playTime(slot.time_start, slot.time_end) }}<br /><br />
					BAND:
					<nuxt-link :to="`/${slot.band.story.full_slug}`">{{
						slot.band.story.content.name
					}}</nuxt-link>
					<br />
					<br />
					<br />
				</div>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'

export default {
	name: 'Timetable',
	mixins: [useFormatting, useStorybridge],

	head() {
		return {
			title: 'Timetable',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'description description description' // TODO:
				}
			]
		}
	},

	async asyncData(context) {
		// expands to -> story: { content: {} }
		return await sbData({
			ctx: context,
			path: '/line-up/timetable',
			resolveLinks: 'story'
		})
	}
}
</script>

<style lang="scss" scoped>
// .timetable {
// 	display: flex;
// 	flex-shrink: 0;
// 	flex-grow: 1;
// 	align-items: flex-start;
// 	justify-content: center;
// }
.day {
	border: 1px solid red;
}
.slot {
	border-top: 1px solid red;
}
</style>
