<template>
	<v-tabs optional background-color="transparent" class="mb-10">
		<v-tab
			v-for="(tab, i) in years"
			:key="`history-tab-${i}`"
			:ripple="false"
			:to="tab.full_slug"
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
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { queryHistoryYears } from '~/utils/constants'

export default {
	name: 'TabsHistory',
	mixins: [useFormatting],

	data() {
		return {
			years: []
		}
	},

	async fetch() {
		const historyYears = await sbData({
			ctx: this.$nuxt.context,
			...queryHistoryYears
		})

		this.years = historyYears.stories.map(year => {
			return {
				full_slug: this.$_slashify(year.full_slug),
				slug: year.slug
			}
		})
	}
}
</script>

<style lang="scss" scoped></style>
