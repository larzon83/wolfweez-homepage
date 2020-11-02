<template>
	<section>
		<TabsHistory />
	</section>
</template>

<script>
import { sbData } from '~/utils'
import { queryHistoryYears } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'HistoryOverview',

	head() {
		const title = 'Historie'
		return {
			title,
			meta: createSEOMeta({
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	async asyncData(context) {
		const historyYears = await sbData({
			ctx: context,
			...queryHistoryYears
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
