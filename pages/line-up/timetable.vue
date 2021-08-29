<template>
	<v-row v-if="story.content.entry" class="timetable" tag="section">
		<v-col
			v-for="day in story.content.entry"
			:key="day._uid"
			v-editable="day"
			cols="12"
			lg="6"
		>
			<v-card color="darkish" flat height="100%" class="timetable-card">
				<v-card-title class="timetable-header justify-center text-center pb-3">
					<div class="flex-column justify-center">
						<h2>{{ day.day_display_name }}</h2>
						<div
							class="timetable-header__date text-subtitle-1 font-weight-medium"
						>
							{{ $_niceDate(day.day) }}
						</div>
					</div>
				</v-card-title>
				<v-card-text class="pt-5">
					<div
						v-for="(slot, index) in day.entry"
						:key="slot._uid"
						v-editable="slot"
						class="slot"
					>
						<nuxt-link :to="$_slashify(slot.band.story.full_slug)">{{
							slot.band.story.content.name
						}}</nuxt-link
						><br />
						TIME: {{ $_playTime(slot.time_start, slot.time_end) }}
						<v-divider v-if="index !== day.entry.length - 1" class="my-8" />
					</div>
				</v-card-text>
				<!-- <v-img
					v-if="band.content.image && band.content.image.filename"
					:alt="band.content.name"
					:src="$_transformImage(band.content.image.filename, '600x0')"
					:lazy-src="$_transformImage(band.content.image.filename, '300x0')"
					:aspect-ratio="$config.aspectRatios.BAND"
					eager
					:position="$_shiftImagePositionY(band.content.image_offset)"
				></v-img> -->
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.LINEUP__TIMETABLE.title

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
			pageTitle
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/line-up/timetable',
			resolveLinks: 'story'
		})
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.LINEUP }, { ...routeMeta.LINEUP__TIMETABLE }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
.timetable {
	.timetable-card {
		border: 3px solid getcolor('prime') !important;

		.timetable-header {
			background-color: getcolor('prime');
			color: getcolor('dark');
			text-transform: uppercase;
			border-radius: 0 !important;

			.timetable-header__date {
				color: getcolor('dark', 0.65);
			}
		}
	}
}
</style>
