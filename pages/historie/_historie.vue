<template>
	<section v-editable="story.content">
		<h1>{{ headlinePage }}</h1>
		<b>{{ story.content.date }} {{ story.content.year }}</b>
		<br /><br />

		<!-- Flyer -->
		<v-img
			v-if="story.content.flyer.filename"
			:alt="`Flyer ${headlinePage}`"
			:src="$_transformImage(story.content.flyer.filename, '600x0')"
			:lazy-src="$_transformImage(story.content.flyer.filename, '150x0')"
			aspect-ratio="0.7168"
			eager
			class="py-3"
			max-width="150"
			position="top center"
			contain
		></v-img>

		<!-- Line-Up -->
		<v-row v-if="timetable" class="my-0">
			<v-col cols="12" class="py-0">
				<h2>Line-Up</h2>
			</v-col>
			<v-col v-for="day in timetable" :key="day._uid" cols="6" class="day">
				<h3>
					{{ day.day_display_name }}
				</h3>
				<div>
					{{ $_niceDate(day.day) }}
				</div>

				<ul v-if="day.entry" class="flex py-6 mb-6">
					<li v-for="slot in day.entry" :key="slot._uid" class="slot">
						{{ slot.band.story.content.name }}
					</li>
				</ul>
			</v-col>
		</v-row>

		<!-- Bilder -->
		<ImgGalleries :galleries="galleries" headline="Bilder" />

		<!-- Placeholder for lightgallery -->
		<div id="lightgallery"></div>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData, sortAssetsByName, slashify } from '~/utils'
import { routeMeta, siteTitle } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = `${this.story.content.year} | ${routeMeta.HISTORIE.title}`
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
			return `${siteTitle.short} ${this.story.content.year}`
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
