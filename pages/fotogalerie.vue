<template>
	<section>
		<h1>Fotogalerie</h1>

		<!-- Galerien -->
		<div
			v-for="(gallery, galleryIndex) in galleries"
			:key="`gallery-${galleryIndex}`"
		>
			<v-row class="mt-12">
				<v-col cols="12" class="py-0">
					<h2>{{ festivalName }} {{ gallery.year }}</h2>
				</v-col>
				<v-col
					v-for="(img, imgIndex) in gallery.imgs"
					:key="`img-${imgIndex}`"
					class="d-flex child-flex"
					cols="4"
				>
					<v-img
						:alt="`${festivalName} ${gallery.year} - Bild ${imgIndex + 1}`"
						:src="$_transformImage(img.filename, '500x500')"
						:lazy-src="$_transformImage(img.filename, '6x6')"
						aspect-ratio="1"
						class="grey lighten-2"
						style="cursor: pointer"
						@click="openGallery(imgIndex, galleryIndex)"
					>
						<template #placeholder>
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
		</div>

		<!-- Placeholders for lightgallery -->
		<div
			v-for="(gallery, lightgalleryIndex) in galleries"
			:id="'lightgallery-' + lightgalleryIndex"
			:key="`lightgallery-${lightgalleryIndex}`"
		></div>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { siteTitle } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'Fotogalerie',
	mixins: [useFormatting],

	head() {
		const title = 'Fotogalerie'
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
			festivalName: siteTitle.short
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/fotogalerie'
		})
	},

	computed: {
		...mapState('config', ['festivals']),

		galleries() {
			const festivalsWithGalleries = this.festivals.filter(
				festival => festival.content.gallery.length > 0
			)
			return festivalsWithGalleries.map(festival => {
				return {
					year: festival.content.year,
					imgs: festival.content.gallery
				}
			})
		},

		dynamicElements() {
			const elements = this.galleries.map(gallery => {
				return gallery.imgs.map((img, index) => {
					return {
						downloadUrl: img.filename,
						subHtml: `${this.festivalName} ${gallery.year}`,
						alt: `${this.festivalName} ${gallery.year} - Bild ${index + 1}`,
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
			})
			return elements
		}
	},

	methods: {
		// TODO: make this a mixon
		// to be also used in history-slug
		openGallery(slideIndex = 0, galleryIndex = 0) {
			const lg = document.getElementById(`lightgallery-${galleryIndex}`)

			window.lightGallery(lg, {
				download: true,
				dynamic: true,
				dynamicEl: this.dynamicElements[galleryIndex],
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
		}
	}
}
</script>
