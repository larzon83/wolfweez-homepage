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
		}
	}
}
