<template>
	<div class="header d-flex flex-column justify-start">
		<div
			v-rellax="{
				speed: -2
			}"
			class="container py-0 mt-lg-6 mt-4"
		>
			<v-row align="end" justify="center" no-gutters>
				<v-col class="byline text-right pr-3 d-none d-md-block" cols="3">
					{{ currentFestival.content.date }}<br />
					<b>{{ currentFestival.content.year }}</b>
				</v-col>
				<v-col class="logo-wrapper text-center" cols="9" md="6">
					<nuxt-link
						aria-label="Zur Startseite"
						class="logo-link d-block"
						to="/"
					>
						<WolfweezLogo />
					</nuxt-link>
				</v-col>
				<v-col class="byline text-left pl-3 d-none d-md-block" cols="3">
					<b>IRSLINGEN</b><br />
					bei Rottweil
				</v-col>
			</v-row>
		</div>
		<!-- Rellax Options: https://github.com/dixonandmoe/rellax#features -->
		<div class="trees1"></div>
		<div
			v-rellax="{
				speed: -2
			}"
			class="trees2"
		></div>
		<div
			v-rellax="{
				speed: -4
			}"
			class="trees3"
		></div>
		<div
			v-rellax="{
				speed: -8
			}"
			class="bg"
		></div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Header',

	computed: {
		...mapState(['currentFestival'])
	}
}
</script>

<style lang="scss" scoped>
@mixin tree {
	background-repeat: repeat-x;
	background-size: auto var(--trees-height);
	background-position-x: center;
	background-position-y: var(--trees-pos-y);
}

.header {
	// at 520px, the logo starts to shrink
	// -> also, proportionally shrink the height of the header
	--header-height: 295px; // fallback
	--header-height: clamp(
		195px,
		calc(33.718689789vw + var(--trees-height)),
		295px
	);
	--bg-pos-y: -18px; // fallback
	--bg-pos-y: clamp(-300px, calc(calc(18vw + var(--trees-height)) * -1), -18px);
	--trees-pos-y: 175px; // fallback
	--trees-pos-y: calc(var(--header-height) - var(--trees-height));
	--trees-height: 120px;

	@media (min-width: 520px) {
		--header-height: 320px;
		--bg-pos-y: -18px;
		--trees-pos-y: 160px;
		--trees-height: 160px;
	}

	@media #{map-get($display-breakpoints, 'lg-and-up')} {
		--header-height: 380px;
		--trees-pos-y: 200px;
		--trees-height: 180px;
	}

	position: relative;
	overflow: hidden;
	z-index: 0;
	height: var(--header-height) !important;
	margin-top: -64px;

	.trees1 {
		@include pos-absolute;
		@include tree;
		z-index: -1;
		background-image: url('~assets/img/trees1.svg');
	}
	.trees2 {
		@include pos-absolute;
		@include tree;
		background-position-y: calc(var(--trees-pos-y) - 5px);
		z-index: -2;
		background-image: url('~assets/img/trees2.svg');
	}
	.trees3 {
		@include pos-absolute;
		@include tree;
		z-index: -3;
		background-image: url('~assets/img/trees3.svg');
	}

	.bg {
		@include pos-absolute;
		z-index: -4;
		background-image: radial-gradient(
				circle,
				rgb(184 192 194 / 88%) 0%,
				rgb(184 192 194 / 88%) 100%
			),
			url('~assets/img/bg.svg');
		background-repeat: repeat-x;
		background-size: auto 520px, auto 520px;
		background-position-x: center, center;
		background-position-y: var(--bg-pos-y), var(--bg-pos-y);
	}

	.container {
		@media #{map-get($display-breakpoints, 'md-only')} {
			padding: 0;
			max-width: 598px;
		}
		@media #{map-get($display-breakpoints, 'lg-only')} {
			padding: 0;
		}
		@media #{map-get($display-breakpoints, 'xl-only')} {
			max-width: unset;
		}

		.logo-wrapper {
			max-width: 367px;

			.logo-link {
				&:active {
					opacity: 0.96;
					transform: scale(0.99);
				}
			}
		}

		.byline {
			font-family: 'Titillium Web', 'InterVariable', sans-serif;
			font-size: $size19;
			line-height: 1.15;
			text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14),
				0px 0px 2px rgba(0, 0, 0, 0.25);

			@media #{map-get($display-breakpoints, 'md-only')} {
				font-size: $size17;
				line-height: 1;
			}
		}
	}
}
</style>
