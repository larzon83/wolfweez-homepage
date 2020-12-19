<template>
	<v-row justify="center" align="center" style="margin-top: -25px" no-gutters>
		<!-- <v-col cols="12" sm="8" md="6"> -->
		<v-col cols="12">
			<div class="text-center">
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
				<!-- max-width="220" -->
			</div>
			<v-card color="#666">
				<!-- <div>
					<v-btn icon>
						<v-icon color="#ff0000">$menu</v-icon>
					</v-btn>
				</div> -->
				<client-only>
					<div>
						<flip-countdown
							deadline="2021-07-02 20:00:00"
							:labels="timerLabels"
						></flip-countdown>
					</div>
				</client-only>
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
import useStorybridge from '~/mixins/useStorybridge.js'
// import HomePage from '~/components/HomePage.vue'
import { sbData } from '~/utils'
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'Index',
	components: {
		// HomePage
		FlipCountdown
	},
	mixins: [useStorybridge],

	head() {
		const title = this.currentFestival.content.title_meta
		return {
			title,
			meta: createSEOMeta({
				description: this.currentFestival.content.description_meta,
				title
			})
		}
	},

	data() {
		return {
			timerLabels: {
				days: 'Tage',
				hours: 'Stunden',
				minutes: 'Min.',
				seconds: 'Sek.'
			}
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/homepage'
		})
	},

	computed: {
		...mapGetters('config', ['currentFestival'])
	},

	mounted() {
		// console.log('this.story.content:', this.story.content)
	}
}
</script>

<style lang="scss" scoped>
.flip-clock ::v-deep {
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
		color: #ebebee;
	}
	.flip-card__bottom,
	.flip-card__back-bottom {
		background: var(--v-primary-base);
		color: #ebebee;
		border-top-color: rgba(0, 0, 0, 0.15);
	}
	.flip-card__back::before,
	.flip-card__back::after {
		background: #cc5555;
		color: #d1d1d4;
	}
}
</style>
