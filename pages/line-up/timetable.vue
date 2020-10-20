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
					{{ niceDateForDay(day.day) }}
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
					TIME: {{ time(slot.time_start, slot.time_end) }}<br /><br />
					BAND:
					<nuxt-link :to="`/${slot.band.full_slug}`">{{
						slot.band.content.name
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
import useStorybridge from '~/mixins/useStorybridge.js'
import { niceTime, sbData } from '~/utils'

export default {
	name: 'Timetable',
	mixins: [useStorybridge],

	async asyncData(context) {
		// expands to -> story: { content: {} }
		return await sbData({
			ctx: context,
			path: '/line-up/timetable',
			resolve: 'timetable_entry.band'
		})
	},

	methods: {
		niceDateForDay(dateRaw) {
			const splitted = dateRaw.substr(0, 10).split('-')
			return `${splitted[2]}.${splitted[1]}.${splitted[0]}`
		},

		time(timeStart, timeEnd) {
			return niceTime(timeStart, timeEnd)
		}
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
