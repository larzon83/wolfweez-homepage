<template>
	<section>
		<TabsHistory />
		<h2>{{ headline }}</h2>
		<b>{{ year.content.date }}</b>
		<br /><br />

		<v-img
			v-if="year.content.flyer.filename"
			:lazy-src="$_transformImage(year.content.flyer.filename, '150x0')"
			:src="$_transformImage(year.content.flyer.filename, '600x0')"
			:alt="'Logo'"
			eager
			class="py-3"
			max-width="150"
			:transition="false"
			position="top center"
			contain
		></v-img>

		<h3>Line-Up</h3>

		<v-row v-if="timetable" class="timetable">
			<v-col
				v-for="day in timetable"
				:key="day._uid"
				v-editable="day"
				cols="6"
				class="day"
			>
				<h4>
					{{ day.day_display_name }}
				</h4>
				<div>
					{{ $_niceDate(day.day) }}
				</div>

				<ul v-if="day.entry" class="flex py-6 mb-6">
					<li
						v-for="slot in day.entry"
						:key="slot._uid"
						v-editable="slot"
						class="slot"
					>
						{{ slot.band.story.content.name }}
					</li>
				</ul>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { siteTitleShort } from '~/utils/constants'

export default {
	mixins: [useFormatting, useStorybridge],

	head() {
		return {
			title: `${this.year.slug} | Historie`,
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: this.year.description_meta
				}
			]
		}
	},

	async asyncData(context) {
		const historyYear = await sbData({
			ctx: context,
			path: `/historie/${context.params.slug}`,
			isStartpage: 1
		})

		const historyTimetable = await sbData({
			ctx: context,
			path: `/historie/${context.params.slug}/timetable`,
			resolveLinks: 'story'
		})

		return {
			timetable: historyTimetable.story.content.entry,
			year: historyYear.story
		}
	},

	computed: {
		headline() {
			return `${siteTitleShort} ${this.year.slug}`
		}
	}
}
</script>
