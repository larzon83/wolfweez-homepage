<template>
	<!-- eslint-disable vue/no-v-html -->
	<div>
		<v-row
			v-for="tag in ['div', 'nav']"
			:key="tag"
			justify="center"
			align="start"
			no-gutters
			class="navbar"
			:tag="tag"
			:class="[
				{ 'is-home hidden-md-only': $route.name === 'index' },
				tag === 'div' ? 'd-lg-none' : 'd-none d-lg-flex',
				`is-${tag}`
			]"
		>
			<!-- mobile -->
			<v-btn
				v-if="tag === 'div'"
				:ripple="false"
				height="42"
				text
				tile
				class="nav-btn nav-btn-active"
				tag="div"
			>
				<template #default>
					<span v-html="mobileHeadline"></span>
				</template>
			</v-btn>

			<!-- desktop -->
			<template v-for="(navItem, i) in mainNavItems" v-else>
				<!-- button with menu -->
				<v-menu
					v-if="navItem.tabType"
					:key="`main-nav-btn-with-menu-${i}`"
					open-on-hover
					attach
					eager
					tile
					offset-y
					transition="slide-y-reverse-transition"
				>
					<template #activator="{ on, attrs }">
						<v-btn
							:ripple="false"
							:to="navItem.to"
							height="42"
							nuxt
							active-class="nav-btn-active"
							class="nav-btn"
							text
							tile
							v-bind="attrs"
							v-on="on"
							>{{ navItem.title }}</v-btn
						>
					</template>

					<v-list color="darkish" class="subnav">
						<v-list-item
							v-for="(item, index) in subNavItems[navItem.tabType]"
							:key="index"
							:to="item.to"
							nuxt
							:ripple="false"
							active-class="subnav-item-active"
							class="subnav-item"
						>
							<v-list-item-title class="subnav-item-title">
								{{ item.title }}
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
				<!-- just the button -->
				<v-btn
					v-else
					:key="`main-nav-btn-no-menu-${i}`"
					:ripple="false"
					:to="navItem.to"
					height="42"
					nuxt
					active-class="nav-btn-active"
					class="nav-btn"
					text
					tile
					>{{ navItem.title }}</v-btn
				>
			</template>
		</v-row>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { slashify } from '~/utils'
import { mainNavItems, routeMeta } from '~/utils/constants'

export default {
	name: 'MainNav',

	computed: {
		...mapState(['currentFestival', 'subNavItems']),

		mobileHeadline() {
			const currentPath = slashify(this.$route.path)

			if (currentPath === '/') {
				return `${this.currentFestival.content.date} ${this.currentFestival.content.year} &nbsp;·&nbsp; Irslingen`
			}

			const mainNavItemsWithoutHome = [...this.mainNavItems].splice(1)
			const foundInMainNavItems = mainNavItemsWithoutHome.find(p =>
				currentPath.includes(p.to)
			)

			if (foundInMainNavItems) {
				return foundInMainNavItems.title
			}

			let headline = ''
			for (const route of Object.values(routeMeta)) {
				if (route.to === currentPath) {
					headline = route.title
					break
				}
			}

			if (!headline && process.client && this.$nuxt.context.nuxtState.error) {
				headline = 'shizzle'
			}

			return headline
		}
	},

	created() {
		this.mainNavItems = mainNavItems
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	height: 54px;
	border-bottom: 2px solid getcolor('bright', 0.06);

	&.is-home {
		border-bottom: none;
		margin-bottom: 20px;

		&.is-div .nav-btn {
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
		color: getcolor('bright', 0.6);
	}
}

.nav-btn-active {
	background: getcolor('prime');
	color: getcolor('bright') !important;
	font-weight: 800;

	&:before {
		opacity: 0 !important;
	}
}

.v-menu__content {
	box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.8);
}

.subnav {
	.subnav-item {
		padding: 0 50px 0 16px;
		color: getcolor('bright', 0.8) !important;
		text-transform: uppercase;
		letter-spacing: 0.0125em;
	}

	.subnav-item-title {
		font-size: $size14;
	}

	.subnav-item-active {
		color: getcolor('bright') !important;
		font-weight: 700;
	}
}
</style>
