<template>
	<v-tabs
		v-if="tabItems.length"
		optional
		background-color="transparent"
		class="tabs-navigation"
		active-class="tabs-navigation-active"
		slider-size="2"
		color="bright"
	>
		<v-tab
			v-for="(tab, i) in tabItems"
			:key="`${type}-tab-${i}`"
			:ripple="false"
			:to="tab.to"
			nuxt
			text
			tile
			class="ma-0"
			>{{ tab.title }}</v-tab
		>
	</v-tabs>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import useFormatting from '~/mixins/useFormatting.js'
import { routeMeta, tabTypes } from '~/utils/constants'

export default {
	name: 'TabsNavigation',
	mixins: [useFormatting],

	props: {
		type: {
			type: String,
			default: ''
		}
	},

	computed: {
		...mapState('config', ['infos']),
		...mapGetters('config', ['historicFestivals']),

		tabItems() {
			if (this.type === tabTypes.LINEUP) {
				return [
					{ ...routeMeta.LINEUP__BANDS },
					{ ...routeMeta.LINEUP__TIMETABLE }
				]
			}

			if (this.type === tabTypes.HISTORY) {
				return this.historicFestivals.map(festival => {
					return {
						title: festival.content.year,
						to: this.$_slashify(festival.full_slug)
					}
				})
			}

			if (this.type === tabTypes.INFOS) {
				return this.infos.map(info => {
					return {
						title: info.title,
						to: this.$_slashify(info.full_slug)
					}
				})
			}

			return []
		}
	}
}
</script>

<style lang="scss" scoped>
.tabs-navigation {
	box-shadow: inset 0 -2px 0 rgba(235, 235, 238, 0.06);

	.tabs-navigation-active {
		font-weight: 700;
	}
}
</style>
