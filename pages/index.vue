<template>
	<!-- <v-row justify="center" align="center" style="margin-top: -25px" no-gutters> -->
	<v-row justify="center" align="center" no-gutters class="mt-lg-5 mt-0">
		<v-col cols="12">
			<vue-horizontal
				ref="horizontal"
				class="horizontal"
				@scroll-debounce="onScrollDebounce"
			>
				<v-img
					v-for="band in bands.stories"
					:key="band.content._uid"
					:alt="band.content.name"
					:src="$_transformImage(band.content.image.filename, '530x0')"
					:lazy-src="$_transformImage(band.content.image.filename, '100x0')"
					class="item"
					aspect-ratio="1.9048"
					eager
					position="top center"
					contain
				>
					<nuxt-link
						:aria-label="band.content.name"
						:to="$_slashify(band.full_slug)"
					/>
				</v-img>
			</vue-horizontal>
			<div class="pagination">
				<div
					v-for="i in pages"
					:key="i"
					class="dot"
					:class="{ current: i - 1 === index }"
					@click="onPageClick(i - 1)"
				>
					<div></div>
				</div>
			</div>
		</v-col>

		<!-- <v-col cols="12" sm="8" md="6"> -->
		<v-col cols="12" class="mt-12">
			<!-- <div class="text-center">
				<v-img
					:src="require('~/assets/img/logo.png')"
					:alt="'Logo'"
					aspect-ratio="2.4294"
					eager
					class="px-8"
					min-height="100"
					position="top center"
					contain
				></v-img>
			</div> -->
			<!-- max-width="220" -->
			<!-- color="#323435" -->
			<v-card color="#2a2c2d">
				<!-- <div>
					<v-btn icon>
						<v-icon color="#ff0000">$menu</v-icon>
					</v-btn>
				</div> -->
				<div class="countdown-wrapper">
					<client-only>
						<div>
							<flip-countdown
								deadline="2022-07-01 20:00:00"
								:labels="timerLabels"
							></flip-countdown>
						</div>
					</client-only>
				</div>
				<v-card-title class="headline">
					Welcome to the Vuetify + Nuxt.js template!
				</v-card-title>
				<v-card-text>
					<p>YEAR: {{ currentFestival.content.year }}</p>
					<p>DATE: {{ currentFestival.content.date }}</p>
					<p>FLYER: {{ currentFestival.content.flyer.filename }}</p>
					<p>DESC: {{ currentFestival.content.description_meta }}</p>
					<p>
						Vuetify is a progressive Material Design component framework for
						Vue.js. It was designed to empower developers to create amazing
						applications.
					</p>
					<p>
						For more information on Vuetify, check out the
						<a
							href="https://vuetifyjs.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							documentation </a
						>.
					</p>
					<p>
						If you have questions, please join the official
						<a
							href="https://chat.vuetifyjs.com/"
							target="_blank"
							rel="noopener noreferrer"
							title="chat"
						>
							discord </a
						>.
					</p>
					<p>
						Find a bug? Report it on the github
						<a
							href="https://github.com/vuetifyjs/vuetify/issues"
							target="_blank"
							rel="noopener noreferrer"
							title="contribute"
						>
							issue board </a
						>.
					</p>
					<p>
						Thank you for developing with Vuetify and I look forward to bringing
						more exciting features in the future.
					</p>
					<div class="text-xs-right">
						<em><small>&mdash; John Leider</small></em>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
					<hr class="my-3" />
					<a
						href="https://nuxtjs.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt Documentation
					</a>
					<br />
					<a
						href="https://github.com/nuxt/nuxt.js"
						target="_blank"
						rel="noopener noreferrer"
					>
						Nuxt GitHub
					</a>
				</v-card-text>
			</v-card>
		</v-col>

		<!-- <component
			:is="story.content.component"
			v-if="story.content.component"
			:key="story.content._uid"
			:blok="story.content"
		/> -->
		<HomePage v-if="story.content.component" :blok="story.content" />
	</v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import FlipCountdown from 'vue2-flip-countdown'
import VueHorizontal from 'vue-horizontal'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'Index',
	components: {
		FlipCountdown,
		VueHorizontal
	},
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = this.currentFestival.content.title_meta
		return {
			title,
			meta: createSEOMeta({
				description: this.currentFestival.content.description_meta,
				title
			}),
			link: [
				{ rel: 'preconnect', href: 'https://a.storyblok.com' },
				{ rel: 'preconnect', href: 'https://img2.storyblok.com' },
				{
					rel: 'preload',
					as: 'image',
					href: this.$_transformImage(
						this.bands.stories[0].content.image.filename,
						'530x0'
					)
					// imagesrcset: this.heroSrcset.srcset,
					// imagesizes: this.heroSrcset.sizes
				}
			]
		}
	},

	data() {
		return {
			pageTitle: routeMeta.HOME.title,
			width: 0,
			index: 0,
			pages: 0,
			timerLabels: {
				days: 'Tage',
				hours: 'Stunden',
				minutes: 'Min.',
				seconds: 'Sek.'
			}
		}
	},

	async asyncData(context) {
		const homepage = await sbData({
			ctx: context,
			path: '/homepage'
		})

		const bands = await sbData({
			ctx: context,
			startsWith: 'line-up/bands/',
			isStartpage: 0
		})

		context.store.commit('central/RESET_CRUMBS')

		return { ...homepage, bands }
	},

	computed: {
		...mapGetters('config', ['currentFestival'])
	},

	mounted() {
		// console.log('this.story.content:', this.story.content)
	},

	methods: {
		onScrollDebounce({ scrollWidth, width, left }) {
			this.width = width
			this.index = Math.round(left / width)
			this.pages = Math.round(scrollWidth / width)
		},
		onPageClick(i) {
			if (i === this.pages - 1) {
				// If last page, always scroll to last item
				this.$refs.horizontal.scrollToIndex(this.bands.stories.length - 1)
			} else {
				this.$refs.horizontal.scrollToLeft(i * this.width)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.countdown-wrapper {
	min-height: 100px;

	@media (min-width: 360px) {
		min-height: 107px;
	}
	@media (min-width: 460px) {
		min-height: 117px;
	}
	@media (min-width: 1000px) {
		min-height: 140px;
	}
}

.flip-clock ::v-deep {
	.flip-card {
		@media (max-width: 459px) {
			font-size: 1.8rem !important;
		}
		@media (max-width: 359px) {
			font-size: 1.5rem !important;
		}
	}

	.flip-card__top,
	.flip-card__bottom,
	.flip-card__back-bottom,
	.flip-card__back::before,
	.flip-card__back::after {
		border-radius: 3px;
		width: 2.45em;
	}
	.flip-card__top {
		background: var(--v-primary-base);
		color: var(--v-bright-base);
	}
	.flip-card__bottom,
	.flip-card__back-bottom {
		background: var(--v-primary-base);
		color: var(--v-bright-base);
		border-top-color: rgba(0, 0, 0, 0.15);
	}
	.flip-card__back::before,
	.flip-card__back::after {
		background: #cc5555;
		color: #d1d1d4;
	}
}

.item {
	border-radius: 7px;
	// border: 3px solid var(--v-primary-base);
	// padding: 16px 24px;
	color: var(--v-dark-base);
	// background: #f3f3f3;
	width: 100%;
	margin-right: 24px;

	// &::after {
	a {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 6px;
		border: 3px solid var(--v-primary-base);
		transition: all 0.14s ease-in-out;
	}
	@media (hover: hover) {
		a:hover {
			// border: 3px solid var(--v-bright-base);
			// background: var(--v-primary-base);
			// opacity: 0.3;
			background: rgba(224, 94, 94, 0.3);
		}
	}
}

@media #{map-get($display-breakpoints, 'md-and-up')} {
	.item {
		width: calc((100% - (24px)) / 2);
	}
}

@media #{map-get($display-breakpoints, 'xl-only')} {
	.item {
		width: calc((100% - (2 * 24px)) / 3);
	}
}

.horizontal ::v-deep .v-hl-btn svg {
	margin: 0;
	padding: 4px;
	height: 30px;
	width: 30px;
	color: var(--v-dark-base);
	background: var(--v-primary-base);
	box-shadow: none;
	transition: color 0.14s ease-in-out;

	@media (hover: hover) {
		&:hover {
			color: var(--v-bright-base);
		}
	}
}

.pagination {
	display: flex;
	justify-content: center;
	margin-top: 16px;
	height: 18px;
}

.dot {
	padding: 4px;
	cursor: pointer;
}

.dot > div {
	border-radius: 10px;
	width: 10px;
	height: 10px;
	background: rgba(255, 255, 255, 0.2);
	transition: background 0.1s ease;
}

.dot:hover > div {
	background: rgba(255, 255, 255, 0.6);
}

.dot.current > div {
	background: var(--v-primary-base);
}
</style>
