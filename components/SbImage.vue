<template>
	<v-img
		v-if="pic.filename"
		:alt="alt || pic.alt"
		:aspect-ratio="defs.aspectRatio"
		:contain="isContain"
		:eager="eager"
		:height="defs.height"
		:lazy-src="lazySrc"
		:max-width="defs.maxWidth"
		:position="defs.position"
		:srcset="defs.srcset"
		:sizes="defs.sizes"
		:src="defs.defaultSrc"
		:width="defs.width"
	></v-img>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import { presetOptions, presets } from '~/utils/responsive-images'

export default {
	name: 'SbImage',
	mixins: [useFormatting],
	props: {
		alt: {
			type: String,
			default: undefined
		},
		aspectRatio: {
			type: [Number, String],
			default: undefined
		},
		contain: {
			type: Boolean,
			default: undefined
		},
		disableLazySrc: {
			type: Boolean,
			default: false
		},
		eager: {
			type: Boolean,
			default: true
		},
		exactHeight: {
			type: [Number, String],
			default: undefined
		},
		maxWidth: {
			type: [Number, String],
			default: undefined
		},
		pic: {
			type: Object,
			required: true
		},
		position: {
			type: String,
			default: undefined
		},
		preset: {
			type: String,
			required: true
		},
		sizes: {
			type: String,
			default: undefined
		}
	},

	computed: {
		currentPreset() {
			return presets[this.preset]
		},

		isContain() {
			if (this.contain === false) return false
			if (this.contain === true) return true
			if (this.currentPreset.contain === false) return false
			return true
		},

		lazySrc() {
			if (this.disableLazySrc || this.currentPreset.disableLazySrc) {
				return undefined
			}

			const lazyWidth = Math.ceil(4 * this.$_aspectRatio(this.pic.filename))
			return this.getSbUrl(lazyWidth)
		},

		defs() {
			let width
			let height
			let defaultSrc
			let srcset

			if (this.exactHeight) {
				height = this.exactHeight
				width = Math.round(
					this.$_aspectRatio(this.pic.filename) * this.exactHeight
				)
				srcset = this.generateDpiSrcsetEntries(width)
				defaultSrc = this.getSbUrl(width)
			} else {
				srcset = this.generateSrcsetEntries(this.currentPreset.widths.srcset)
				defaultSrc = this.getSbUrl(this.currentPreset.widths.defaultSrc)
			}

			return {
				aspectRatio:
					this.aspectRatio ||
					this.currentPreset.aspectRatio ||
					this.$_aspectRatio(this.pic.filename),
				maxWidth: this.maxWidth || this.currentPreset.maxWidth,
				position:
					this.position ||
					this.currentPreset.bgPosition ||
					presetOptions.BG_POSITION_CENTER,
				sizes: this.sizes || this.currentPreset.sizes, // undefined when exactHeight, bc no "sizes" in preset -> srcset with 1x, 2x is sufficient
				srcset,
				defaultSrc,
				width,
				height
			}
		}
	},

	methods: {
		getSbUrl(width) {
			return this.$_transformImage(this.pic.filename, `${width.toString()}x0`)
		},

		generateSrcsetEntries(widths) {
			return widths.reduce((acc, currWidth, index) => {
				const divider = index < widths.length - 1 ? ',' : ''
				const url = this.getSbUrl(currWidth)
				const entry = `${url} ${currWidth.toString()}w`
				return acc + entry + divider
			}, '')
		},

		generateDpiSrcsetEntries(width) {
			const size1 = this.getSbUrl(width)
			const size2 = this.getSbUrl(width * 2)
			const size3 = this.getSbUrl(width * 3)
			return `${size1} 1x, ${size2} 2x, ${size3} 3x`
		}
	}
}
</script>
