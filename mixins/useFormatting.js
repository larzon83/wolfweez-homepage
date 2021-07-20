import { getNiceDate, getPlayTime } from '~/utils'

export default {
	methods: {
		$_slashify(path, { startSlash = true } = {}) {
			let slash1 = ''
			if (startSlash) slash1 = path.substr(0, 1) !== '/' ? '/' : ''

			const slash2 = path.substr(-1) !== '/' ? '/' : ''
			return slash1 + path + slash2
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

		$_generateSrcsetEntries(filename, widths) {
			return widths.reduce((acc, currWidth, index) => {
				const divider = index < widths.length - 1 ? ',' : ''
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
		}
	}
}
