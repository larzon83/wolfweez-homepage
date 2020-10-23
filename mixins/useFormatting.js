import { getNiceDate, getPlayTime } from '~/utils'

export default {
	methods: {
		$_niceDate(dateString) {
			return getNiceDate(dateString)
		},

		$_playTime(timeStart, timeEnd) {
			return getPlayTime(timeStart, timeEnd)
		}
	}
}
