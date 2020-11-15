<template>
	<section v-editable="story.content">
		<TabsNavigation :type="tabType" />
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
		<v-row v-if="timetable">
			<v-col cols="12" class="py-0">
				<h2>Line-Up</h2>
			</v-col>
			<v-col v-for="day in timetable" :key="day._uid" cols="6" class="day">
				<h4>
					{{ day.day_display_name }}
				</h4>
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
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData, sortAssetsByName } from '~/utils'
import { siteTitle, tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	mixins: [useFormatting, useStorybridge],

	head() {
		const title = `${this.story.slug} | Historie`
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
			tabType: tabTypes.HISTORY
		}
	},

	async asyncData(context) {
		const historyTimetable = await sbData({
			ctx: context,
			path: `/historie/${context.params.slug}/timetable`,
			resolveLinks: 'story'
		})

		const historyYear = await sbData({
			ctx: context,
			path: `/historie/${context.params.slug}`,
			isStartpage: 1
		})

		historyYear.story.content.gallery = sortAssetsByName(
			historyYear.story.content.gallery
		)

		return {
			timetable: historyTimetable.story.content.entry,
			...historyYear
		}
	},

	computed: {
		headlinePage() {
			return `${siteTitle.short} ${this.story.slug}`
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
