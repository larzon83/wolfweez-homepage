import { getNiceDate, getPlayTime } from '~/utils'

export default {
	methods: {
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
