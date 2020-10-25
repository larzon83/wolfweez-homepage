<template>
	<v-tabs optional background-color="transparent" class="mb-10">
		<v-tab
			v-for="(tab, i) in years"
			:key="`history-tab-${i}`"
			:ripple="false"
			:to="`/${tab.full_slug}`"
			nuxt
			active-class="aaa"
			text
			tile
			color="#202020"
			class="ma-0"
			>{{ tab.slug }}</v-tab
		>
	</v-tabs>
</template>

<script>
import { sbData } from '~/utils'

export default {
	name: 'TabsHistory',

	data() {
		return {
			years: []
		}
	},

	async fetch() {
		const historyYears = await sbData({
			ctx: this.$nuxt.context,
			isStartpage: 1,
			sortBy: 'slug:desc',
			startsWith: 'historie/'
		})

		this.years = historyYears.stories.map(year => {
			return {
				full_slug: year.full_slug,
				slug: year.slug
			}
		})
	}
}
</script>

<style lang="scss" scoped></style>
