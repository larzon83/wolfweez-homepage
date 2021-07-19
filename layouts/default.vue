<template>
	<v-app v-scroll="onScroll">
		<Toolbar :swap-toolbar="swapToolbar" />
		<!-- <v-parallax
			class="header-wrapper"
			height="520"
			alt=""
			:src="require('~/assets/img/trans2.png')"
		>
			<div class="container py-0 mt-xl-10 mt-lg-13 mt-4">
				<v-row align="end" justify="center" no-gutters>
					<v-col
						class="header-byline text-right pr-3 d-none d-md-block"
						cols="3"
					>
						02. - 04. Juli<br />
						<b>2021</b>
					</v-col>
					<v-col class="text-center" cols="9" md="6" style="max-width: 500px">
						<v-img
							:src="require('~/assets/img/logo.png')"
							:alt="'Logo'"
							aspect-ratio="2.7106"
							eager
							min-height="100"
							position="top center"
							contain
						></v-img>
					</v-col>
					<v-col
						class="header-byline text-left pl-3 d-none d-md-block"
						cols="3"
					>
						<b>IRSLINGEN</b><br />
						bei Rottweil
					</v-col>
				</v-row>
			</div>
		</v-parallax> -->

		<v-main>
			<Header />
			<v-container class="pt-0 pb-16">
				<MainNav />
				<nuxt />
			</v-container>
			<Footer />
		</v-main>
	</v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar'

export default {
	name: 'Default',
	components: {
		Toolbar
	},

	data() {
		return {
			offsettop: 0,
			swapToolbar: false
		}
	},

	methods: {
		onScroll(e) {
			this.offsettop = window.pageYOffset
			if (this.offsettop > 105) this.swapToolbar = true
			else this.swapToolbar = false
		}
	}
}
</script>

<style lang="scss" scoped>
.header-wrapper {
	height: max(min(50.5vw, 520px), 220px) !important;
}

.header-wrapper ::v-deep .v-parallax__content {
	padding: 0;
	justify-content: flex-start;
}

.header-wrapper ::v-deep .v-parallax__image-container img {
	// NOTE: prevent nuxt minifying "0px" to "0" when building for prod which is invalid CSS
	--null-px: 0px;

	bottom: unset;
	top: -520px;

	background-image: url('~assets/img/trees.svg'),
		radial-gradient(
			circle,
			rgb(184 192 194 / 88%) 0%,
			rgb(184 192 194 / 88%) 100%
		),
		url('~assets/img/bg.svg');
	background-repeat: repeat-x;
	// background-size: auto 520px;
	// background-position: center -20px;
	background-size: auto 220px, auto 520px, auto 520px;
	background-position: center min(calc(max(65vw, 350px) - 220px), 300px),
		center min(calc(max(65vw, 350px) - 520px), var(--null-px)),
		center min(calc(max(65vw, 350px) - 520px), var(--null-px));

	// transform: translateZ(-100px) scale(2);
	z-index: -1;
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	.header-wrapper .container {
		max-width: unset;
	}
}

.header-byline {
	font-size: $size18;
	line-height: 1.3;
	text-shadow: 2px -1px 0px rgba(0, 0, 0, 0.55);
}

// .header-wrapper ::v-deep .v-parallax__image-container img:after {
// 	content: '';
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	bottom: 0;
// 	right: 0;
// 	// max-height: max(65vw, 350px);

// 	background-image: url('~assets/img/trees.svg'),
// 		linear-gradient(getcolor('dark') 0%, getcolor('dark') 100%);
// 	background-repeat: repeat-x;
// 	// background-size: auto 520px;
// 	// background-position: center -20px;
// 	background-size: auto 220px, auto 220px;
// 	background-position: center min(calc(max(65vw, 350px) - 220px), 300px),
// 		center min(calc(max(65vw, 350px)), 520px);

// 	z-index: -1;
// }

// .v-main:before {
// 	content: '';
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	bottom: 0;
// 	right: 0;
// 	max-height: max(65vw, 350px);
// 	// background-image: url('~assets/img/bg-top.jpg');
// 	// background-position: bottom 23px center;
// 	// background-size: auto 120px;
// 	// background-repeat: repeat-x;

// 	background-image: url('~assets/img/trees.svg'),
// 		radial-gradient(
// 			circle,
// 			rgb(184 192 194 / 88%) 0%,
// 			rgb(184 192 194 / 88%) 100%
// 		),
// 		url('~assets/img/bg.svg');
// 	background-repeat: repeat-x;
// 	// background-size: auto 520px;
// 	// background-position: center -20px;
// 	background-size: auto 220px, auto 520px, auto 520px;
// 	background-position: center min(calc(max(65vw, 350px) - 220px), 300px),
// 		center -20px, center -20px;
// 	// background-attachment: fixed;
// }
.tmp {
	color: rgba(235, 235, 238, 0.35);
	// color: rgba(235, 235, 238, 0.58);
	// background: getcolor('darkish');
	// background: getcolor('prime');
	height: 54px;
	font-size: $size20;
	font-weight: 500;
	letter-spacing: 0.0125em;
	// padding-left: 16px;
	// border-radius: $border-radius-root;
	border-top-left-radius: $border-radius-root;
	border-top-right-radius: $border-radius-root;
	border-bottom: 3px solid rgba(235, 235, 238, 0.35);
	// border-bottom: 3px solid getcolor('prime');
	margin-bottom: 30px;

	div {
		// display: flex;
		// align-items: center;
		// justify-content: center;
		// height: 46px;
		min-width: 14px;
		margin: 0px 12px;

		&.active {
			position: relative;
			color: getcolor('bright');
			// color: getcolor('prime');
			font-weight: 900;

			&:after {
				position: absolute;
				content: '';
				bottom: -13px;
				left: 0;
				background: getcolor('bright');
				width: 100%;
				height: 3px;
			}
		}
	}
}
</style>
