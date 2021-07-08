<template>
	<!-- eslint-disable vue/no-v-html -->
	<v-row
		justify="center"
		align="start"
		no-gutters
		class="navbar"
		:class="{ 'is-home hidden-md-only': $route.name === 'index' }"
	>
		<v-btn
			:ripple="false"
			height="42"
			text
			tile
			class="nav-btn nav-btn-active d-lg-none"
			tag="div"
		>
			<template #default>
				<span v-html="mobileHeadline"></span>
			</template>
			{{ mobileHeadline }}</v-btn
		>
		<v-btn
			v-for="(navItem, i) in mainNavItems"
			:key="`main-nav-btn-${i}`"
			:ripple="false"
			:to="navItem.to"
			height="42"
			nuxt
			active-class="nav-btn-active"
			class="nav-btn d-none d-lg-flex"
			text
			tile
			>{{ navItem.title }}</v-btn
		>
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import useFormatting from '~/mixins/useFormatting.js'
import { mainNavItems, routeMeta } from '~/utils/constants'

export default {
	name: 'MainNav',
	mixins: [useFormatting],

	data() {
		return {
			mainNavItems
		}
	},

	computed: {
		...mapGetters('config', ['currentFestival']),

		mobileHeadline() {
			let headline = ''
			const currentPath = this.$_slashify(this.$route.path)
			const mainNavItemsWithoutHome = [...this.mainNavItems].splice(1)
			const foundInMainNavItems = mainNavItemsWithoutHome.find(p =>
				currentPath.includes(p.to)
			)

			if (foundInMainNavItems) {
				headline = foundInMainNavItems.title
			} else if (currentPath === '/') {
				headline = `${this.currentFestival.content.date} ${this.currentFestival.content.year} &nbsp;·&nbsp; Irslingen`
			} else {
				for (const route of Object.values(routeMeta)) {
					if (route.to === currentPath) {
						headline = route.title
						break
					}
				}
			}

			return headline
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 54px;
	border-bottom: 2px solid rgba(235, 235, 238, 0.06);

	&.is-home {
		border-bottom: none;
		margin-bottom: 20px;

		.nav-btn {
			@media (max-width: 399px) {
				/*
					min: 16px (1rem)
					max: 20px (1.25rem)
					preferred examples:
						- viewport width 400px => 400 / 100 * 5 = 20px
						- viewport width 380px => 380 / 100 * 5 = 19px
				*/
				font-size: clamp(1rem, 5vw, 1.25rem);
			}
			@media #{map-get($display-breakpoints, 'xs-only')} {
				width: 100%;
			}
		}
	}
}

.nav-btn {
	font-size: $size20;
	letter-spacing: $main-nav-letter-spacing;

	&:not(.nav-btn-active) ::v-deep .v-btn__content {
		color: rgba(235, 235, 238, 0.6);
	}
}

.nav-btn-active {
	background: var(--v-primary-base);
	color: var(--v-bright-base) !important;
	font-weight: 800;

	&:before {
		opacity: 0 !important;
	}
}
</style>
