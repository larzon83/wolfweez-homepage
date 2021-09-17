<template>
	<v-img
		v-if="pic && pic.filename"
		:alt="alt || pic.alt"
		:aspect-ratio="defs.aspectRatio"
		:contain="isContain"
		:content-class="contentClass"
		:eager="defs.eager"
		:height="defs.height"
		:lazy-src="lazySrc"
		:max-width="defs.maxWidth"
		:position="defs.position"
		:srcset="defs.srcset"
		:sizes="defs.sizes"
		:src="defs.defaultSrc"
		:width="defs.width"
		:class="{ rounded: defs.rounded }"
		:style="marginTop ? `margin-top: ${marginTop}px` : ''"
	>
		<template #placeholder>
			<slot name="placeholder" />
		</template>
		<template #default>
			<slot name="default" />
		</template>
	</v-img>
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
		contentClass: {
			type: String,
			default: undefined
		},
		disableLazySrc: {
			type: Boolean,
			default: false
		},
		eager: {
			type: Boolean,
			default: undefined
		},
		exactHeight: {
			type: [Number, String],
			default: undefined
		},
		marginTop: {
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
		rounded: {
			type: Boolean,
			default: undefined
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

			const multiplier = this.currentPreset.lazySrcMultiplier || 4

			const lazyWidth = Math.ceil(
				multiplier * this.$_aspectRatio(this.pic.filename)
			)
			return this.$_getSbImageUrl(
				this.pic.filename,
				lazyWidth,
				this.currentPreset.imageFormat
			)
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
				srcset = this.$_generateDpiSrcsetEntries(
					this.pic.filename,
					width,
					this.currentPreset.imageFormat
				)
				defaultSrc = this.$_getSbImageUrl(
					this.pic.filename,
					width,
					this.currentPreset.imageFormat
				)
			} else {
				srcset = this.$_generateSrcsetEntries(
					this.pic.filename,
					this.currentPreset.widths.srcset,
					this.currentPreset.imageFormat
				)
				defaultSrc = this.$_getSbImageUrl(
					this.pic.filename,
					this.currentPreset.widths.defaultSrc,
					this.currentPreset.imageFormat
				)
			}

			return {
				aspectRatio:
					this.aspectRatio ||
					this.currentPreset.aspectRatio ||
					this.$_aspectRatio(this.pic.filename),
				eager: this.eager || this.currentPreset.eager || false,
				maxWidth: this.maxWidth || this.currentPreset.maxWidth,
				position:
					this.position ||
					this.currentPreset.bgPosition ||
					presetOptions.BG_POSITION_CENTER,
				rounded: this.rounded || this.currentPreset.rounded || false,
				sizes: this.sizes || this.currentPreset.sizes, // undefined when exactHeight, bc no "sizes" in preset -> srcset with 1x, 2x is sufficient
				srcset,
				defaultSrc,
				width,
				height
			}
		}
	}
}
</script>
