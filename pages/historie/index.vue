<template>
	<section></section>
</template>

<script>
import { sbData } from '~/utils'

export default {
	name: 'HistoryOverview',

	head() {
		return {
			title: 'Historie',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'description description description' // TODO:
				}
			]
		}
	},

	async middleware(context) {
		const historyYears = await sbData({
			ctx: context,
			isStartpage: 1,
			sortBy: 'slug:desc',
			startsWith: 'historie/'
		})

		let destination = '/'

		if (historyYears) {
			const years = historyYears.stories.map(year => {
				return year.slug
			})
			destination = years[0]
		}

		context.redirect(301, `/historie/${destination}`)
	}
}
</script>
