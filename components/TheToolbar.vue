<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
			right
			disable-resize-watcher
			temporary
			width="100vw"
			height="auto"
			style="padding-bottom: 64px"
		>
			<!-- icon for closin open burger menu -->
			<div style="min-height: 64px" class="v-toolbar__content py-0">
				<v-spacer />
				<v-btn aria-label="Menü schließen" icon @click="drawer = !drawer">
					<v-icon>$close</v-icon>
				</v-btn>
			</div>

			<v-list class="pa-0">
				<v-list-item
					v-for="(navItem, i) in mainNavItems"
					:key="i"
					:ripple="false"
					:to="navItem.to"
					:exact-path="$route.name === 'index'"
					nuxt
				>
					<v-list-item-content class="text-center">
						<v-list-item-title v-text="navItem.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			app
			:absolute="!swapToolbar"
			:fixed="swapToolbar"
			tile
			:flat="!swapToolbar"
			:color="swapToolbar ? 'dark' : 'transparent'"
			height="64"
			:class="{
				elevate: swapToolbar
			}"
		>
			<v-btn
				v-if="swapToolbar"
				aria-label="Zur Startseite"
				icon
				nuxt
				to="/"
				class="nav-wolf"
			>
				<v-icon large>$wolf</v-icon>
			</v-btn>

			<template v-if="swapToolbar">
				<v-spacer v-if="currentPageTitle" />
				<v-toolbar-title
					v-if="currentPageTitle"
					class="toolbar-headline d-lg-none"
					:class="{
						'is-visible': swapToolbar
					}"
				>
					<b>{{ currentPageTitle }}</b>
				</v-toolbar-title>
			</template>

			<v-spacer />

			<template v-if="swapToolbar">
				<v-btn
					v-for="(navItem, i) in mainNavItems"
					:key="`toolbar-nav-btn-${i}`"
					:ripple="false"
					:to="navItem.to"
					nuxt
					active-class="nav-btn-active"
					text
					tile
					class="nav-btn ma-0"
				>
					{{ navItem.title }}
				</v-btn>
			</template>

			<v-btn
				aria-label="Menü öffnen"
				icon
				class="menu-btn"
				:class="{ dimmed: !swapToolbar }"
				@click="drawer = !drawer"
			>
				<v-icon class="menu-icon">$menu</v-icon>
			</v-btn>
		</v-app-bar>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { mainNavItems } from '~/utils/constants'

export default {
	name: 'TheToolbar',
	props: {
		swapToolbar: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			drawer: false
		}
	},

	computed: {
		...mapState('central', ['currentPageTitle'])
	},

	created() {
		this.mainNavItems = mainNavItems
	}
}
</script>

<style lang="scss" scoped>
.elevate {
	box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.8) !important;
}

.toolbar-headline {
	font-size: $size17;
	line-height: 1.5rem;
}

.toolbar-headline.is-visible {
	animation: fade-in-toolbar-headline 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)
		both;
}

@keyframes fade-in-toolbar-headline {
	0% {
		opacity: 0;
		transform: translateY(9px);
	}

	100% {
		opacity: 1;
		transform: translateY(0px);
	}
}

.v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
	opacity: 0;
}

.nav-wolf {
	margin-left: -5px !important;
}

.nav-btn {
	letter-spacing: $main-nav-letter-spacing;

	&:not(.nav-btn-active) ::v-deep .v-btn__content {
		color: getcolor('bright', 0.6);
	}
}

.nav-btn-active {
	background: getcolor('prime');
	font-weight: 800;

	&:before {
		opacity: 0 !important;
	}
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
	.nav-btn {
		display: none;
	}
}

.menu-btn {
	&.dimmed {
		color: rgba(0, 0, 0, 0.54);
	}

	@media #{map-get($display-breakpoints, 'lg-and-up')} {
		display: none;
	}
}

.menu-icon {
	transform: rotate(-90deg);
}

.v-navigation-drawer--close.v-navigation-drawer--temporary {
	transform: translateY(-600px) !important;
}

.v-navigation-drawer ::v-deep .v-navigation-drawer__border {
	width: 0;
}

.v-list-item--link {
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: $main-nav-letter-spacing;

	&:not(.v-list-item--active) ::v-deep .v-list-item__title {
		color: getcolor('bright', 0.6);
	}

	&.v-list-item--active {
		background: getcolor('prime');
		font-weight: 800;

		&:hover::before,
		&::before {
			opacity: 0;
		}
	}
}
</style>
