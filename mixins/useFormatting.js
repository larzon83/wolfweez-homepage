import { getNiceDate, getPlayTime, slashify } from '~/utils'
import { createOgImagePath } from '~/utils/seo'
import { formatPrice } from '~/utils/stripe-helpers'
import { imageFormats, presets, presetOptions } from '~/utils/responsive-images'

export default {
	methods: {
		$_slashify(path, { startSlash = true } = {}) {
			return slashify(path, { startSlash })
		},

		$_niceDate(dateString) {
			return getNiceDate(dateString)
		},

		$_playTime(timeStart, timeEnd) {
			return getPlayTime(timeStart, timeEnd)
		},

		$_formatPrice(price) {
			return formatPrice(price)
		},

		$_transformImage(image, dimensions, format) {
			if (!image) return ''
			if (!dimensions) return ''

			const imgFormat = format ? `/filters:format(${format})` : ''
			return image + '/m/' + dimensions + imgFormat
		},

		$_aspectRatio(image) {
			if (!image) return ''

			let dimensions = image.replace('https://a.storyblok.com/f/', '')
			dimensions = dimensions.substr(dimensions.indexOf('/') + 1)
			dimensions = dimensions.substr(0, dimensions.indexOf('/'))
			const [width, height] = dimensions.split('x')
			const ratio = parseFloat(width) / parseFloat(height)
			return ratio.toString()
		},

		$_getSbImageUrl(filename, width, format) {
			return this.$_transformImage(filename, `${width.toString()}x0`, format)
		},

		$_generateOgImageEntry(socialFilename, routeForGenerator) {
			let image
			let imageHeight

			if (socialFilename) {
				image = this.$_transformImage(
					socialFilename,
					'1200x0',
					imageFormats.JPEG
				)
				imageHeight = Math.round(1200 / this.$_aspectRatio(socialFilename))
			} else if (routeForGenerator) {
				image = createOgImagePath(routeForGenerator)
			}
			return { image, imageHeight }
		},

		$_shiftImagePositionY(offsetPercent = 0) {
			if (offsetPercent === 0 || offsetPercent === '0') {
				return presetOptions.BG_POSITION_CENTER
			}

			const offsetNumber = parseInt(offsetPercent)

			if (isNaN(offsetNumber)) {
				return presetOptions.BG_POSITION_CENTER
			} else {
				const percent = 50 + offsetNumber
				return `center ${percent.toString()}%`
			}
		},

		$_generateSrcsetEntries(filename, widths, format) {
			return widths.reduce((acc, currWidth, index) => {
				const divider = index < widths.length - 1 ? ', ' : ''
				const url = this.$_getSbImageUrl(filename, currWidth, format)
				const entry = `${url} ${currWidth.toString()}w`
				return acc + entry + divider
			}, '')
		},

		$_generateDpiSrcsetEntries(filename, width, format) {
			const size1 = this.$_getSbImageUrl(filename, width, format)
			const size2 = this.$_getSbImageUrl(filename, width * 2, format)
			const size3 = this.$_getSbImageUrl(filename, width * 3, format)
			return `${size1} 1x, ${size2} 2x, ${size3} 3x`
		},

		$_getPreloadImageHeadEntry(filename, preset) {
			if (!filename) return undefined
			if (!preset) return undefined

			return {
				rel: 'preload',
				as: 'image',
				imagesrcset: this.$_generateSrcsetEntries(
					filename,
					presets[preset].widths.srcset,
					presets[preset].imageFormat
				),
				imagesizes: presets[preset].sizes
			}
		}
	}
}
