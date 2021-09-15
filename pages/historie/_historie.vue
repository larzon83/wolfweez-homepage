<template>
	<section v-editable="story.content">
		<v-row class="justify-center justify-md-start">
			<v-col
				v-if="story.content.flyer && story.content.flyer.filename"
				cols="9"
				md="4"
				class="flyer d-flex align-self-start justify-center justify-md-start"
			>
				<v-img
					:alt="`Flyer ${headlinePage}`"
					:src="$_transformImage(story.content.flyer.filename, '600x0')"
					:lazy-src="$_transformImage(story.content.flyer.filename, '150x0')"
					aspect-ratio="0.7168"
					eager
					class="rounded"
					content-class="content"
				/>
			</v-col>

			<v-col cols="12" md="8">
				<v-row>
					<v-col cols="12" class="text-center text-md-left">
						<h1 class="pt-3 pt-md-0">{{ headlinePage }}</h1>
						<div class="font-weight-bold pb-6 pb-md-0">
							{{ story.content.date }} {{ story.content.year }}
						</div>
						<v-divider class="d-md-none" />
					</v-col>
				</v-row>

				<v-row v-if="timetable">
					<v-col cols="12">
						<h2>Line-Up</h2>
					</v-col>
					<v-col v-for="day in timetable" :key="day._uid" cols="6">
						<h3>
							{{ day.day_display_name }}
						</h3>
						<div>
							{{ $_niceDate(day.day) }}
						</div>

						<ul v-if="day.entry" class="flex pt-3">
							<li v-for="slot in day.entry" :key="slot._uid">
								{{ slot.band.story.content.name }}
							</li>
						</ul>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<!-- TODO: padding-top-override ??? -->
		<v-row>
			<v-col cols="12">
				<ImgGalleries
					:galleries="galleries"
					padding-top-override="pt-12"
					headline="Bilder"
				/>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData, sortAssetsByName, slashify } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = `${this.story.content.year} | ${routeMeta.HISTORIE.title}`

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

	async asyncData(context) {
		const historyTimetable = await sbData({
			ctx: context,
			path: `/historie/${context.params.historie}/timetable`,
			resolveLinks: 'story'
		})

		const historyYear = await sbData({
			ctx: context,
			path: `/historie/${context.params.historie}`,
			isStartpage: 1
		})

		if (historyYear) {
			historyYear.story.content.gallery = sortAssetsByName(
				historyYear.story.content.gallery
			)
		}

		const crumbs = [
			{ ...routeMeta.HISTORIE },
			{
				title: historyYear?.story.content.year,
				to: slashify(`${routeMeta.HISTORIE.to}${context.params.historie}`)
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return {
			timetable: historyTimetable?.story.content.entry,
			...historyYear
		}
	},

	computed: {
		headlinePage() {
			return `${this.$config.siteTitle.short} ${this.story.content.year}`
		},

		pageTitle() {
			return `Festival ${this.story.content.year}`
		},

		galleries() {
			return [
				{
					year: this.story.content.year,
					imgs: this.story.content.gallery
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped>
.flyer .v-image {
	max-width: 280px;

	::v-deep .content {
		border-radius: $border-radius-root;
		border: 3px solid getcolor('bright');
	}

	// TODO: lightgallery
	// @media (hover: hover) {
	// 	cursor: pointer;
	// 	&:hover {
	// 		::v-deep .content {
	// 			background: getcolor('bright', 0.3);
	// 		}
	// 	}
	// }
}
</style>
