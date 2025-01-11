<template>
	<div :id="id">
		<slot name="default" :open="handleOpenGallery">
			<div v-if="galleries.length" class="gallery">
				<template v-for="(gallery, galleryIndex) in galleries">
					<h2
						v-if="!hideHeadline"
						:key="`gallery-headline-${galleryIndex}`"
						:class="[
							paddingTopOverride
								? paddingTopOverride
								: galleryIndex === 0
								? 'pt-0 pt-lg-12'
								: 'pt-16',
							paddingBottomOverride ? paddingBottomOverride : 'pb-3'
						]"
						v-text="headline ? headline : getGalleryTitle(gallery)"
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
									:alt="`${getGalleryTitle(gallery)} - Bild ${imgIndex + 1}`"
									:src="$_transformImage(img.filename, '221x221')"
									:lazy-src="$_transformImage(img.filename, '6x6')"
									:srcset="$_generateDpiSrcsetEntries(img.filename, 221)"
									aspect-ratio="1"
									class="rounded gallery-image"
									content-class="content"
									@click="handleOpenGallery(imgIndex, galleryIndex)"
								/>
							</v-col>
						</template>
					</v-row>
				</template>
				<v-overlay :value="overlayVisible">
					<v-progress-circular indeterminate size="64"></v-progress-circular>
				</v-overlay>
			</div>
		</slot>
	</div>
</template>

<script>
import lgFullscreen from 'lightgallery/plugins/fullscreen'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-fullscreen.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-zoom.css'
import useFormatting from '~/mixins/useFormatting.js'
import { lightgalleryOptions } from '~/utils/constants'

export default {
	name: 'LightGalleries',
	mixins: [useFormatting],

	props: {
		galleries: {
			type: Array,
			default: () => []
		},
		// TODO: this should rather be inside a gallery in the galleries array
		galleryTitle: {
			type: String,
			default: ''
		},
		headline: {
			type: String,
			default: ''
		},
		hideHeadline: {
			type: Boolean,
			default: false
		},
		id: {
			type: String,
			default: 'lightgallery'
		},
		isSingleImage: {
			type: Boolean,
			default: false
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

	data() {
		return {
			currentGalleryIndex: 0,
			galleryInstance: null,
			overlayDelay: null,
			overlayVisible: false
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
						alt: this.isSingleImage
							? img.alt
							: `${this.getGalleryTitle(gallery)} - Bild ${index + 1}`,
						responsive: `
									${this.$_transformImage(img.filename, '329x0')} 340,
									${this.$_transformImage(img.filename, '529x0')} 540,
									${this.$_transformImage(img.filename, '773x0')} 784,
									${this.$_transformImage(img.filename, '1253x0')} 1264,
									${this.$_transformImage(img.filename, '1589x0')} 1600
									`,
						src: this.$_transformImage(img.filename, '1589x0'),
						thumb: this.$_transformImage(img.filename, '100x80')
					}
				})
			})
			return elements
		}
	},

	beforeDestroy() {
		this.clearOverlayDelay()
		if (this.galleryInstance !== null) {
			this.galleryInstance.destroy()
		}
	},

	methods: {
		getGalleryTitle(gallery) {
			if (this.galleryTitle) {
				return this.galleryTitle
			}

			const maybeYear = gallery?.year ? ` ${gallery.year}` : ''
			return `${this.$config.siteTitle.short}${maybeYear}`
		},

		async handleOpenGallery(slideIndex = 0, galleryIndex = 0) {
			// initialize lightgallery once
			if (this.galleryInstance === null) {
				if (this.currentGalleryIndex !== galleryIndex) {
					this.currentGalleryIndex = galleryIndex
				}

				// don't show loading circle right away -> with fast internet,
				// lightgallery lib loads to fast and spinner would only be visible for a few ms
				this.overlayDelay = setTimeout(() => {
					this.overlayVisible = true
				}, 250)

				// const sleep = new Promise(resolve => setTimeout(resolve, 3000))
				// await sleep

				const lg = await import(
					/* webpackChunkName: "lightgalleryLib" */ 'lightgallery'
				)

				this.clearOverlayDelay()
				this.overlayVisible = false

				const el = document.getElementById(this.id)
				let plugins = [lgFullscreen, lgZoom]

				if (!this.isSingleImage) {
					plugins = [...plugins, lgThumbnail]
				}

				this.galleryInstance = lg.default(el, {
					// TODO: licenseKey
					...lightgalleryOptions,
					plugins,
					dynamicEl: this.dynamicElements[galleryIndex]
				})
			} else if (this.currentGalleryIndex !== galleryIndex) {
				this.currentGalleryIndex = galleryIndex
				this.galleryInstance.refresh(this.dynamicElements[galleryIndex])
			}

			this.galleryInstance.openGallery(parseInt(slideIndex))
		},

		clearOverlayDelay() {
			clearTimeout(this.overlayDelay)
		}
	}
}
</script>

<style lang="scss" scoped>
.gallery {
	--gutter: 10px;

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

<style lang="scss">
body.lg-on {
	font-family: $body-font-family;
	line-height: 1.5;
}

.lg-container {
	font-family: $body-font-family !important;
}

.lg-outer .lg-thumb-item.active,
.lg-outer .lg-thumb-item:hover {
	border-color: getcolor('prime') !important;
}

.lg-outer .lg-counter {
	line-height: 1.5;
}
</style>
