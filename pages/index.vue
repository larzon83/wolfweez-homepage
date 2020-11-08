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
				<v-card-title class="headline">
					Welcome to the Vuetify + Nuxt.js template!
				</v-card-title>
				<v-card-text>
					<p>DATE: {{ festivalDate }}</p>
					<p>FLYER: {{ festivalFlyer.filename }}</p>
					<p>DESC: {{ festivalDescription }}</p>
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
	</v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'Index',

	computed: {
		...mapState('config', [
			'festivalDate',
			'festivalFlyer',
			'festivalDescription'
		])
	}
}
</script>
