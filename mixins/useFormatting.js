import { getNiceDate, getPlayTime, slashify } from '~/utils'
import { createOgImagePath } from '~/utils/seo'
import { presets, presetOptions } from '~/utils/responsive-images'

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

		$_transformImage(image, option) {
			if (!image) return ''
			if (!option) return ''

			const imageService = 'https://img2.storyblok.com/'
			const path = image.replace('https://a.storyblok.com', '')
			return imageService + option + path
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

		$_getSbImageUrl(filename, width) {
			return this.$_transformImage(filename, `${width.toString()}x0`)
		},

		$_generateOgImageEntry(socialFilename, routeForGenerator) {
			let image
			let imageHeight

			if (socialFilename) {
				image = this.$_transformImage(socialFilename, '1200x0')
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

		$_generateSrcsetEntries(filename, widths) {
			return widths.reduce((acc, currWidth, index) => {
				const divider = index < widths.length - 1 ? ', ' : ''
				const url = this.$_getSbImageUrl(filename, currWidth)
				const entry = `${url} ${currWidth.toString()}w`
				return acc + entry + divider
			}, '')
		},

		$_generateDpiSrcsetEntries(filename, width) {
			const size1 = this.$_getSbImageUrl(filename, width)
			const size2 = this.$_getSbImageUrl(filename, width * 2)
			const size3 = this.$_getSbImageUrl(filename, width * 3)
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
					presets[preset].widths.srcset
				),
				imagesizes: presets[preset].sizes
			}
		}
	}
}
