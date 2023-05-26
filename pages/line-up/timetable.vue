<template>
	<v-row v-if="story.content.entry" class="timetable" tag="section">
		<!-- IN-ACTIVE -->
		<v-col v-if="!pageIsActive" cols="12">
			<v-alert
				icon="$info"
				dense
				outlined
				prominent
				text
				class="pa-4 mb-10 mt-0 information--text"
			>
				<p><b>TBA</b></p>
			</v-alert>
		</v-col>

		<!-- ACTIVE -->
		<template v-else>
			<v-col
				v-for="day in story.content.entry"
				:key="day._uid"
				v-editable="day"
				cols="12"
				lg="6"
			>
				<v-card color="darkish" flat height="100%" class="timetable-card">
					<v-card-title
						class="timetable-header justify-center text-center pb-3"
					>
						<div class="flex-column justify-center">
							<h2>{{ day.day_display_name }}</h2>
							<div class="date text-subtitle-1 font-weight-medium">
								{{ $_niceDate(day.day)
								}}<span v-if="day.doors_open" class="doors-open">
									| Einlass: {{ day.doors_open }}</span
								>
							</div>
						</div>
					</v-card-title>
					<v-card-text class="pt-5">
						<v-list color="transparent" class="py-0 mx-n2">
							<template v-for="(slot, index) in day.entry">
								<v-list-item
									:key="`slot-${slot._uid}`"
									:to="$_slashify(slot.band.story.full_slug)"
									:ripple="false"
									nuxt
									class="px-3 rounded"
									:class="{ alternate: index % 2 === 0 }"
								>
									<v-list-item-content class="timetable-content">
										<div class="time mb-1">
											{{ $_playTime(slot.time_start, slot.time_end) }}
										</div>
										<div class="band font-weight-bold">
											{{ slot.band.story.content.name }}
										</div>
									</v-list-item-content>
								</v-list-item>
								<v-divider
									v-if="index !== day.entry.length - 1"
									:key="`divider-${slot._uid}`"
									class="my-2 mx-1"
								/>
							</template>
						</v-list>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12">
				<h2>Frühschoppen am Samstag Morgen</h2>
				<div class="text-subtitle-2 font-weight-regular">08.07.2022</div>
				Traditioneller "Frühschoppen" mit den lustigen Wildeckern
				<!-- <nuxt-link to="/line-up/bands/polkamusikanten-stetten/"
					>Polkamusikanten Stetten</nuxt-link
				> -->
				ab 10:30 Uhr (freier Eintritt). Ende 15 Uhr.
			</v-col>
		</template>
	</v-row>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.LINEUP__TIMETABLE.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = pageTitle

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

	data() {
		return {
			pageIsActive: true,
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

			.date {
				color: getcolor('dark', 0.75);
			}

			.doors-open {
				text-transform: none;
			}
		}

		.timetable-content {
			.time {
				font-size: $size15;
			}
			.band {
				color: getcolor('prime');
				font-size: $size21;
				line-height: 1.3;
			}
		}
	}
}

.v-list-item--link::before {
	border-radius: $border-radius-root;
}

.v-alert {
	::v-deep p:last-child {
		margin: 0;
	}

	a {
		color: currentColor;
	}
}
</style>
