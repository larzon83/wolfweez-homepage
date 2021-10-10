<template>
	<v-row justify="center" align="center" no-gutters class="mt-lg-5 mt-0">
		<v-col cols="12">
			<vue-horizontal
				ref="horizontal"
				class="horizontal"
				@scroll-debounce="onScrollDebounce"
			>
				<!-- <div
					v-for="band in bands.stories"
					:key="band.content._uid"
					class="slider-item"
				>
					<nuxt-link
						:aria-label="band.content.name"
						:to="$_slashify(band.full_slug)"
					>
						<img
							style="width: 100%; height: auto"
							class="d-block"
							width="1200"
							height="630"
							src="https://img2.storyblok.com/567x0/f/95378/1200x630/711a310ab2/voltbeat.jpg"
							srcset="
								https://img2.storyblok.com/253x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   253w,
								https://img2.storyblok.com/288x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   288w,
								https://img2.storyblok.com/300x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   300w,
								https://img2.storyblok.com/308x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   308w,
								https://img2.storyblok.com/328x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   328w,
								https://img2.storyblok.com/339x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   339w,
								https://img2.storyblok.com/343x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   343w,
								https://img2.storyblok.com/350x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   350w,
								https://img2.storyblok.com/367x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   367w,
								https://img2.storyblok.com/400x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   400w,
								https://img2.storyblok.com/467x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   467w,
								https://img2.storyblok.com/506x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   506w,
								https://img2.storyblok.com/567x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   567w,
								https://img2.storyblok.com/576x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   576w,
								https://img2.storyblok.com/600x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   600w,
								https://img2.storyblok.com/616x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   616w,
								https://img2.storyblok.com/656x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   656w,
								https://img2.storyblok.com/678x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   678w,
								https://img2.storyblok.com/686x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   686w,
								https://img2.storyblok.com/700x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   700w,
								https://img2.storyblok.com/734x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   734w,
								https://img2.storyblok.com/800x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   800w,
								https://img2.storyblok.com/934x0/f/95378/1200x630/711a310ab2/voltbeat.jpg   934w,
								https://img2.storyblok.com/1134x0/f/95378/1200x630/711a310ab2/voltbeat.jpg 1134w
							"
							sizes="(max-width: 320px) 288px, (max-width: 340px) 308px, (max-width: 360px) 328px, (max-width: 375px) 343px, (max-width: 382px) 350px, (max-width: 399px) 367px, (max-width: 432px) 400px, (max-width: 499px) 467px, (max-width: 599px) 567px, (max-width: 783px) 253px, (max-width: 1139px) 339px, 300px"
							:alt="band.content.name"
						/>
					</nuxt-link>
				</div> -->

				<v-responsive
					v-for="band in bands.stories"
					:key="band.content._uid"
					:aspect-ratio="$config.aspectRatios.BAND"
					class="slider-item"
				>
					<SbImage
						:alt="band.content.name"
						:pic="band.content.image"
						:preset="$config.presetNames.BAND_OVERVIEW"
						:position="$_shiftImagePositionY(band.content.image_offset)"
					>
						<nuxt-link
							:aria-label="band.content.name"
							:to="$_slashify(band.full_slug)"
							class="band-image"
						/>
					</SbImage>
					<nuxt-link :to="$_slashify(band.full_slug)" class="band-name">
						{{ band.content.name }}
					</nuxt-link>
				</v-responsive>
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

		<v-col cols="12" class="mt-12">
			<v-card color="darkish" flat>
				<div class="countdown-wrapper">
					<client-only>
						<div class="countdown-inner">
							<flip-countdown
								deadline="2022-07-01 20:00:00"
								:labels="timerLabels"
								class="px-2"
							></flip-countdown>
						</div>
					</client-only>
				</div>
				<v-card-title>
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
							>documentation</a
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
							discord</a
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
							issue board</a
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

		<HomePage
			v-if="story.content.component"
			:blok="story.content"
			:news-sorted="newsSorted"
		/>

		<!-- <v-col v-for="item in foo" :key="item.name" cols="12" class="mt-12">
			<div v-if="item.name === 'HomepageGalerie'">
				<v-lazy v-model="item.visible">
					<LazyStoryblokHomepageGalerie
						v-if="item.visible"
						:page-blok="
							story.content.body.find(el => el.component === item.name)
						"
					/>
				</v-lazy>
			</div>
		</v-col> -->

		<!-- <v-lazy v-model="isActive">
			<LazyGoBackHeader v-if="isActive" label="alle Foobar" />
		</v-lazy> -->
	</v-row>
</template>

<script>
import { mapState } from 'vuex'
import FlipCountdown from 'vue2-flip-countdown'
import VueHorizontal from 'vue-horizontal'
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { getNewsSorted, sbData } from '~/utils'
import { routeMeta, sbHomeBloks } from '~/utils/constants'
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

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.currentFestival.content.image_social?.filename
		)

		const linkEntries = []
		const preloadImage = this.$_getPreloadImageHeadEntry(
			this.bands.stories[0].content.image?.filename,
			this.$config.presetNames.BAND_OVERVIEW
		)
		if (preloadImage) linkEntries.push(preloadImage)

		return {
			title,
			meta: createSEOMeta({
				description: this.currentFestival.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
				title
			}),
			link: [...linkEntries]
		}
	},

	data() {
		return {
			// isActive: false,
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

		// const foo = homepage.story.content.body.map(item => {
		// 	return {
		// 		name: item.component,
		// 		visible: false
		// 	}
		// })
		// console.log('foo:', foo)

		const body = homepage.story.content.body
		let newsSorted

		const homeHasNews = body.find(item => item.component === sbHomeBloks.NEWS)

		if (homeHasNews) {
			const newsDir = await sbData({
				ctx: context,
				startsWith: 'news/'
			})
			const news = newsDir.stories.filter(item => !item.is_startpage)
			newsSorted = getNewsSorted(news).slice(0, 3)
		}

		context.store.commit('central/RESET_CRUMBS')

		return {
			...homepage,
			// foo,
			bands,
			newsSorted
		}
	},

	computed: {
		...mapState(['currentFestival'])
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
	min-height: 103px;

	// prevent flickering of icons in buttons down the page
	.countdown-inner {
		overflow: hidden;
		transform-style: preserve-3d;
	}

	@media (min-width: 360px) {
		min-height: 110px;
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
			font-size: 1.9rem !important;
		}
		@media (max-width: 359px) {
			font-size: 1.6rem !important;
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
		background: getcolor('prime');
		color: getcolor('bright');
	}
	.flip-card__bottom,
	.flip-card__back-bottom {
		background: getcolor('prime');
		color: getcolor('bright');
		border-top-color: rgba(0, 0, 0, 0.15);
	}
	.flip-card__back::before,
	.flip-card__back::after {
		background: #cc5555;
		color: #d1d1d4;
	}
}

.slider-item {
	--band-name-height: 34px;
	border-top-left-radius: 7px;
	border-top-right-radius: 7px;
	border-bottom-left-radius: $border-radius-root;
	border-bottom-right-radius: $border-radius-root;
	color: getcolor('dark');
	width: 100%;
	margin-right: 24px;
	padding-bottom: var(--band-name-height);

	&:last-child {
		margin-right: 0;
	}

	@media (hover: hover) {
		&:hover .band-image {
			background: getcolor('prime', 0.3);
		}
	}

	@media #{map-get($display-breakpoints, 'md-and-up')} {
		width: calc((100% - (24px)) / 2);
	}

	@media #{map-get($display-breakpoints, 'xl-only')} {
		width: calc((100% - (2 * 24px)) / 3);
	}

	.band-image {
		@include pos-absolute; // NOTE: remove for pure img
		content: ''; // NOTE: remove for pure img
		border-top-left-radius: $border-radius-root;
		border-top-right-radius: $border-radius-root;
		border: 3px solid getcolor('prime');
		border-bottom: none;
		transition: background 0.14s ease-in-out;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		flex-wrap: nowrap;
		text-decoration: none;
	}

	.band-name {
		position: absolute;
		bottom: 0;
		width: 100%;
		font-size: $size14;
		font-weight: 700;
		background: getcolor('prime');
		color: getcolor('dark');
		text-align: center;
		height: var(--band-name-height);
		line-height: var(--band-name-height);
		text-decoration: none;
	}
}

.horizontal ::v-deep .v-hl-btn svg {
	margin: 0;
	padding: 4px;
	height: 30px;
	width: 30px;
	color: getcolor('dark');
	background: getcolor('prime');
	box-shadow: none;
	transition: color 0.14s ease-in-out;

	@media (hover: hover) {
		&:hover {
			color: getcolor('bright');
		}
	}
}

.pagination {
	display: flex;
	justify-content: center;
	margin-top: 16px;
	height: 18px;

	.dot {
		padding: 4px;
		cursor: pointer;
	}

	.dot > div {
		border-radius: 10px;
		width: 10px;
		height: 10px;
		background: getcolor('bright', 0.23);
		transition: background 0.1s ease;
	}

	.dot:hover > div {
		background: getcolor('bright', 0.6);
	}

	.dot.current > div {
		background: getcolor('prime');
	}
}
</style>
