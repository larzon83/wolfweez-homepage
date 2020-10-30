<template>
	<section>
		<TabsHistory />
	</section>
</template>

<script>
import { sbData } from '~/utils'
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'HistoryOverview',

	head() {
		const title = 'Historie'
		return {
			title,
			meta: createSEOMeta({
				description: '',
				title,
				url: this.$route.path
			})
		}
	},

	async asyncData(context) {
		// NOTE: same api-call is used inside @/modules/netlifyTomlUpdater
		// -> when updating here, update there, too
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
			destination = years[0] + '/'
		}

		return { destination }
	},

	created() {
		this.$router.push(this.destination)
	}
}
</script>
