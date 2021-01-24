<template>
	<section>
		<TabsNavigation :type="tabType" />
		<v-row v-if="story.content.entry" class="timetable my-0">
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
					<nuxt-link :to="$_slashify(slot.band.story.full_slug)">{{
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
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Timetable'

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			pageTitle,
			tabType: tabTypes.LINEUP
		}
	},

	async asyncData(context) {
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
