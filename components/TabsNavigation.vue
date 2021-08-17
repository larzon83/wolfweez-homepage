<template>
	<v-tabs
		v-show="tabItems"
		optional
		background-color="transparent"
		class="tabbar"
		slider-size="2"
		color="bright"
		prev-icon="$chevronLeft"
		next-icon="$chevronRight"
		show-arrows
	>
		<v-tab
			v-for="(tab, i) in tabItems"
			:key="`${type}-tab-${i}`"
			:ripple="false"
			:to="tab.to"
			nuxt
			active-class="tab-btn-active"
			class="tab-btn ma-0"
			>{{ tab.title }}</v-tab
		>
	</v-tabs>
</template>

<script>
import { mapState } from 'vuex'
import useFormatting from '~/mixins/useFormatting.js'
import { mainNavItems } from '~/utils/constants'

export default {
	name: 'TabsNavigation',
	mixins: [useFormatting],

	computed: {
		...mapState(['subNavItems']),

		type() {
			const currentPath = this.$_slashify(this.$route.path)

			const mainNavItemsWithoutHome = [...mainNavItems].splice(1)
			const foundInMainNavItems = mainNavItemsWithoutHome.find(p =>
				currentPath.includes(p.to)
			)

			if (foundInMainNavItems?.tabType) {
				return foundInMainNavItems.tabType
			}

			return undefined
		},

		tabItems() {
			if (!this.type) return undefined

			if (this.subNavItems[this.type]) {
				return this.subNavItems[this.type]
			}

			return undefined
		}
	}
}
</script>

<style lang="scss" scoped>
.tabbar {
	box-shadow: inset 0 -2px 0 getcolor('bright', 0.06);

	::v-deep .v-slide-group__prev,
	::v-deep .v-slide-group__next {
		flex-basis: 34px;
		min-width: 34px;
	}
	::v-deep .v-slide-group__prev {
		justify-content: flex-start;
	}
	::v-deep .v-slide-group__next {
		justify-content: flex-end;
	}

	.tab-btn {
		&.tab-btn-active {
			font-weight: 700;
		}

		&:not(.tab-btn-active) {
			color: getcolor('bright', 0.6) !important;
		}
	}
}
</style>
