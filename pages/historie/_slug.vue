<template>
	<section v-editable="story.content">
		<TabsHistory />
		<h2>{{ headline }}</h2>
		<b>{{ story.content.date }}</b>
		<br /><br />

		<!-- Flyer -->
		<v-img
			v-if="story.content.flyer.filename"
			:alt="`Flyer ${headline}`"
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
				<h3>Line-Up</h3>
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
		<client-only>
			<v-row v-if="sortedThumbs">
				<v-col cols="12" class="py-0">
					<h3>Bilder</h3>
				</v-col>
				<v-col
					v-for="(img, index) in sortedThumbs"
					:key="index"
					class="d-flex child-flex"
					cols="4"
				>
					<v-img
						:alt="`${headline} - Bild ${index + 1}`"
						:src="$_transformImage(img.filename, '500x500')"
						:lazy-src="$_transformImage(img.filename, '6x6')"
						aspect-ratio="1"
						class="grey lighten-2"
						style="cursor: pointer"
						@click="openGallery(index)"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
							</v-row>
						</template>
					</v-img>
				</v-col>
			</v-row>
		</client-only>

		<!-- Placeholder for lightgallery -->
		<client-only>
			<div id="lightgallery"></div>
		</client-only>
	</section>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { siteTitle } from '~/utils/constants'
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

		return {
			timetable: historyTimetable.story.content.entry,
			...historyYear
		}
	},

	computed: {
		headline() {
			return `${siteTitle.short} ${this.story.slug}`
		},

		sortedThumbs() {
			if (!this.story.content.gallery || !this.story.content.gallery.length)
				return []

			const sortedThumbs = this.story.content.gallery

			const getFilename = url => {
				return url.substring(url.lastIndexOf('/') + 1)
			}

			return sortedThumbs.sort((a, b) => {
				const sorted = getFilename(a.filename) - getFilename(b.filename)
				return this.story.content.gallery.indexOf(sorted)
			})
		},

		dynamicElements() {
			return this.sortedThumbs.map((img, index) => {
				return {
					downloadUrl: img.filename,
					subHtml: this.headline,
					alt: `${this.headline} - Bild ${index + 1}`,
					responsive: `
									${this.$_transformImage(img.filename, '329x0')} 340,
									${this.$_transformImage(img.filename, '529x0')} 540,
									${this.$_transformImage(img.filename, '773x0')} 784,
									${this.$_transformImage(img.filename, '1253x0')} 1264,
									${this.$_transformImage(img.filename, '1589x0')} 1600
									`,
					src: img.filename,
					thumb: this.$_transformImage(img.filename, '96x96')
				}
			})
		}
	},

	mounted() {
		// const el = document.getElementById('lightgallery')
		// el.addEventListener(
		// 	'onBeforeOpen',
		// 	function (e) {
		// 		// alert('onBeforeOpen')
		// 		console.log('e:', e)
		// 	},
		// 	false
		// )
		// window.lightGallery(el)
		// Go to third slide
		// Index starts from 0
		// window.lgData[el.getAttribute('lg-uid')].slide(1)
	},

	methods: {
		openGallery(slideIndex = 0) {
			const lg = document.getElementById('lightgallery')

			window.lightGallery(lg, {
				download: true,
				dynamic: true,
				dynamicEl: this.dynamicElements,
				fullScreen: true,
				hideBarsDelay: 3000,
				hideControlOnEnd: true,
				loop: false,
				mode: 'lg-slide',
				speed: 120,
				supportLegacyBrowser: false,
				thumbnail: true
			})

			// set slide index to the one passed from the clicked thumb
			const pl = window.lgData[lg.getAttribute('lg-uid')]
			pl.index = parseInt(slideIndex)

			// lg.addEventListener(
			// 	'onAfterOpen',
			// 	function () {
			// 		window.lgData[lg.getAttribute('lg-uid')].slide(Number(slideIndex))
			// 		window.lgData[lg.getAttribute('lg-uid')].index = Number(slideIndex)
			// 	},
			// 	{
			// 		once: true
			// 	}
			// )

			// lg.addEventListener(
			// 	'onBeforeOpen',
			// 	function (event) {
			// 		// console.log('event:', event)
			// 		// window.lgData[lg.getAttribute('lg-uid')].index = 1
			// 		// lg.data('lightgallery').destroy(true)
			// 		// window.lgData[lg.getAttribute('lg-uid')].slide(index)
			// 		// window.lgData[lg.getAttribute('lg-uid')].destroy(true)
			// 	},
			// 	false
			// )

			// window.lightGallery(lg)

			// window.lgData[lg.getAttribute('lg-uid')].slide(index)
		}
	}
}
</script>
