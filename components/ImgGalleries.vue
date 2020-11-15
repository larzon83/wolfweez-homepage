<template>
	<div v-if="galleries.length">
		<div
			v-for="(gallery, galleryIndex) in galleries"
			:key="`gallery-${galleryIndex}`"
		>
			<v-row :class="marginTopClass">
				<v-col cols="12" class="py-0">
					<h2>
						<span v-if="headline">{{ headline }}</span>
						<span v-else>{{ galleryName }} {{ gallery.year }}</span>
					</h2>
				</v-col>
				<v-col
					v-for="(img, imgIndex) in gallery.imgs"
					:key="`gallery-${galleryIndex}--img-${imgIndex}`"
					class="d-flex child-flex"
					cols="4"
				>
					<v-img
						:alt="`${galleryName} ${gallery.year} - Bild ${imgIndex + 1}`"
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
	</div>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import { siteTitle } from '~/utils/constants'

export default {
	name: 'ImgGalleries',
	mixins: [useFormatting],

	props: {
		galleries: {
			type: Array,
			default: () => []
		},
		headline: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			galleryName: siteTitle.short
		}
	},

	computed: {
		marginTopClass() {
			return this.galleries.length > 1 ? 'mt-12' : ''
		},

		dynamicElements() {
			const elements = this.galleries.map(gallery => {
				return gallery.imgs.map((img, index) => {
					return {
						downloadUrl: img.filename,
						subHtml: `${this.galleryName} ${gallery.year}`,
						alt: `${this.galleryName} ${gallery.year} - Bild ${index + 1}`,
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
