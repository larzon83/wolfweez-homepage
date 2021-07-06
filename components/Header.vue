<template>
	<div class="header">
		<div
			v-rellax="{
				speed: -2
			}"
			class="container py-0 mt-lg-7 mt-4"
		>
			<v-row align="end" justify="center" no-gutters>
				<v-col class="byline text-right pr-3 d-none d-md-block" cols="3">
					{{ currentFestival.content.date }}<br />
					<b>{{ currentFestival.content.year }}</b>
				</v-col>
				<v-col class="logo-wrapper text-center" cols="9" md="6">
					<WolfweezLogo />
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
import { mapGetters } from 'vuex'

export default {
	name: 'Header',

	computed: {
		...mapGetters('config', ['currentFestival'])
	}
}
</script>

<style lang="scss" scoped>
@mixin pos-absolute {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
}

@mixin tree {
	background-repeat: repeat-x;
	background-size: auto 220px;
	background-position: center
		max(min(calc(50.5vw - 220px), 300px), var(--null-px));
}

.header {
	// NOTE: prevent nuxt minifying "0px" to "0" when building for prod which is invalid CSS
	--null-px: 0px;

	position: relative;
	overflow: hidden;
	z-index: 0;
	height: max(min(50.5vw, 520px), 220px) !important;
	margin-top: -64px;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	.trees1 {
		@include pos-absolute;
		@include tree;
		z-index: -1;
		background-image: url('~assets/img/trees1.svg');
	}
	.trees2 {
		@include pos-absolute;
		@include tree;
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
		background-position: center
				min(calc(max(50.5vw, 350px) - 520px), var(--null-px)),
			center min(calc(max(50.5vw, 350px) - 520px), var(--null-px));
	}

	// .bg-old {
	// 	@include pos-absolute;
	// 	z-index: -2;

	// 	background-image: url('~assets/img/trees.svg'),
	// 		radial-gradient(
	// 			circle,
	// 			rgb(184 192 194 / 88%) 0%,
	// 			rgb(184 192 194 / 88%) 100%
	// 		),
	// 		url('~assets/img/bg.svg');
	// 	background-repeat: repeat-x;
	// 	background-size: auto 220px, auto 520px, auto 520px;
	// 	background-position: center
	// 			max(min(calc(50.5vw - 220px), 300px), var(--null-px)),
	// 		center min(calc(max(50.5vw, 350px) - 520px), var(--null-px)),
	// 		center min(calc(max(50.5vw, 350px) - 520px), var(--null-px));
	// }

	.container {
		@media #{map-get($display-breakpoints, 'md-and-up')} {
			max-width: unset;
		}

		.logo-wrapper {
			max-width: 500px;
		}

		.byline {
			font-size: $size18;
			line-height: 1.3;
			font-family: 'Titillium Web', 'InterVariable', sans-serif;
			text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.14),
				0px 0px 2px rgba(0, 0, 0, 0.25);
		}
	}
}
</style>
