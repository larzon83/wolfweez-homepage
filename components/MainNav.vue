<template>
	<v-row justify="center" align="start" no-gutters class="navbar">
		<v-btn
			v-for="(navItem, i) in mainNavItems"
			:key="`main-nav-btn-${i}`"
			:ripple="false"
			:to="navItem.to"
			height="40"
			nuxt
			active-class="nav-btn-active"
			text
			tile
			class="nav-btn"
			>{{ navItem.title }}</v-btn
		>
	</v-row>
</template>

<script>
import { mainNavItems } from '~/utils/constants'

export default {
	name: 'MainNav',

	data() {
		return {
			mainNavItems
		}
	}
}
</script>

<style lang="scss" scoped>
.navbar {
	background: $c-dark;
	// height: 48px;
	height: 52px;
	// border-bottom: 3px solid rgba(235, 235, 238, 0.18);
	border-bottom: 2px solid rgba(235, 235, 238, 0.06);
	// margin-bottom: 30px;

	@media #{map-get($display-breakpoints, 'md-and-down')} {
		display: none;
	}
}

.nav-btn {
	font-size: 1.25rem; // 20px
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
