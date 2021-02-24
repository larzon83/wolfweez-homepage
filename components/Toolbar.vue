<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
			right
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
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					nuxt
					:ripple="false"
				>
					<v-list-item-content class="text-center">
						<v-list-item-title v-text="item.title" />
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
			:color="swapToolbar ? '#212121' : 'transparent'"
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
				<v-img
					:src="require('~/assets/icons/wolf.svg')"
					:alt="'Logo'"
					aspect-ratio="1.0805"
					eager
					height="34"
					position="center center"
					contain
				></v-img>
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

			<v-btn
				v-for="(item, i) in items"
				:key="`nav-btn-${i}`"
				:ripple="false"
				:to="item.to"
				nuxt
				active-class="nav-btn-active"
				text
				tile
				color="#212121"
				class="nav-btn ma-0"
				:class="{
					'white--text': swapToolbar
				}"
				>{{ item.title }}</v-btn
			>

			<v-btn
				aria-label="Menü öffnen"
				icon
				:dark="swapToolbar"
				:light="!swapToolbar"
				class="menu-btn"
				@click="drawer = !drawer"
			>
				<v-icon class="menu-icon">$menu</v-icon>
			</v-btn>

			<!-- <template v-slot:extension>
				<v-tabs align-with-title>
					<v-tab>Tab 1</v-tab>
					<v-tab>Tab 2</v-tab>
					<v-tab>Tab 3</v-tab>
				</v-tabs>
			</template> -->
		</v-app-bar>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { routeMeta } from '~/utils/constants'

export default {
	name: 'Toolbar',
	props: {
		swapToolbar: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			drawer: false,
			items: [
				{ ...routeMeta.HOME },
				{ ...routeMeta.NEWS },
				{ ...routeMeta.INFOS },
				{ ...routeMeta.LINEUP },
				{ ...routeMeta.HISTORIE }
			]
		}
	},

	computed: {
		...mapState('central', ['currentPageTitle'])
	}
}
</script>

<style lang="scss" scoped>
.elevate {
	box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.8) !important;
}

.toolbar-headline {
	font-size: 1.0625rem;
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

.nav-btn-active {
	color: #fff !important;
	background: var(--v-primary-base);

	&:before {
		opacity: 0 !important;
	}
}

@media #{map-get($display-breakpoints, 'md-and-down')} {
	.nav-btn {
		display: none;
	}
}

@media #{map-get($display-breakpoints, 'lg-and-up')} {
	.menu-btn {
		display: none;
	}
}

.menu-icon {
	transform: rotate(-90deg);
}

.v-navigation-drawer--close.v-navigation-drawer--temporary {
	transform: translateY(-600px) !important;
}

.v-list-item--link {
	font-weight: 500;
	text-transform: uppercase;

	&.v-list-item--active {
		color: white;
		background-color: var(--v-primary-base);

		&:hover::before,
		&::before {
			opacity: 0;
		}
	}
}

// .v-app-bar ::v-deep .v-toolbar__content {
// 	align-items: flex-start;
// 	padding-top: 10px;
// }
</style>
