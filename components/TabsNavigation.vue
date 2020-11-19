<template>
	<v-tabs v-if="tabItems" optional background-color="transparent" class="mb-10">
		<v-tab
			v-for="(tab, i) in tabItems"
			:key="`${type}-tab-${i}`"
			:ripple="false"
			:to="tab.to"
			nuxt
			active-class="aaa"
			text
			tile
			color="#202020"
			class="ma-0"
			>{{ tab.title }}</v-tab
		>
	</v-tabs>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import useFormatting from '~/mixins/useFormatting.js'
import { tabTypes } from '~/utils/constants'

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
					{
						title: 'Bands',
						to: '/line-up/bands/'
					},
					{
						title: 'Timetable',
						to: '/line-up/timetable/'
					}
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
