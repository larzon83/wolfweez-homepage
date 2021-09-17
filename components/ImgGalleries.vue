<template>
	<div v-if="galleries.length" class="gallery">
		<template v-for="(gallery, galleryIndex) in galleries">
			<h2
				:key="`gallery-headline-${galleryIndex}`"
				:class="[
					paddingTopOverride
						? paddingTopOverride
						: galleryIndex === 0
						? 'pt-0 pt-lg-12'
						: 'pt-16',
					paddingBottomOverride ? paddingBottomOverride : 'pb-3'
				]"
				v-text="
					headline ? headline : `${$config.siteTitle.short} ${gallery.year}`
				"
			/>
			<v-row :key="`gallery-${galleryIndex}`" class="gallery-row">
				<template v-for="(img, imgIndex) in gallery.imgs">
					<v-col
						v-if="!maxPicsToShow || imgIndex < maxPicsToShow"
						:key="`gallery-${galleryIndex}--img-${imgIndex}`"
						class="gallery-col d-flex child-flex"
						cols="3"
						:lg="colsLg"
					>
						<v-img
							:alt="`${$config.siteTitle.short} ${gallery.year} - Bild ${
								imgIndex + 1
							}`"
							:src="$_transformImage(img.filename, '218x218')"
							:lazy-src="$_transformImage(img.filename, '6x6')"
							:srcset="
								$_generateDpiSrcsetEntries(img.filename, 218, imageFormats.JPEG)
							"
							aspect-ratio="1"
							class="rounded gallery-image"
							content-class="content"
							@click="openGallery(imgIndex, galleryIndex)"
						>
							<template #placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular
										indeterminate
										color="ahref"
										aria-label="Fortschritt Bild Download"
									></v-progress-circular>
								</v-row>
							</template>
						</v-img>
					</v-col>
				</template>
			</v-row>
		</template>

		<!-- Placeholders for lightgallery -->
		<div
			v-for="(gallery, lightgalleryIndex) in galleries"
			:id="'lightgallery-' + lightgalleryIndex"
			:key="`lightgallery-${lightgalleryIndex}`"
		/>
	</div>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import { lightgalleryOptions } from '~/utils/constants'
import { imageFormats } from '~/utils/responsive-images'

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
		},
		paddingTopOverride: {
			type: String,
			default: undefined
		},
		paddingBottomOverride: {
			type: String,
			default: undefined
		},
		colsLg: {
			type: String,
			default: undefined
		},
		maxPicsToShow: {
			type: Number,
			default: undefined
		}
	},

	computed: {
		dynamicElements() {
			const elements = this.galleries.map(gallery => {
				const imgsToLoop = this.maxPicsToShow
					? gallery.imgs.slice(0, this.maxPicsToShow)
					: gallery.imgs
				return imgsToLoop.map((img, index) => {
					return {
						downloadUrl: img.filename,
						subHtml: `${this.$config.siteTitle.short} ${gallery.year}`,
						alt: `${this.$config.siteTitle.short} ${gallery.year} - Bild ${
							index + 1
						}`,
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

	created() {
		this.imageFormats = imageFormats
	},

	methods: {
		openGallery(slideIndex = 0, galleryIndex = 0) {
			const lg = document.getElementById(`lightgallery-${galleryIndex}`)

			window.lightGallery(lg, {
				...lightgalleryOptions,
				dynamicEl: this.dynamicElements[galleryIndex]
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

<style lang="scss" scoped>
.gallery {
	--gutter: 12px;

	@media #{map-get($display-breakpoints, 'lg-and-down')} {
		--gutter: 8px;
	}
	@media #{map-get($display-breakpoints, 'md-and-down')} {
		--gutter: 4px;
	}

	.gallery-row {
		margin: calc(var(--gutter) * -1);

		.gallery-col {
			padding: var(--gutter);
		}
	}

	.gallery-image {
		box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.6);

		@media (hover: hover) {
			cursor: pointer;
			&:hover {
				::v-deep .content {
					border-radius: $border-radius-root;
					border: 3px solid getcolor('prime');
					background: getcolor('prime', 0.3);
				}
			}
		}
	}
}
</style>
