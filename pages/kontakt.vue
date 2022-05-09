<template>
	<section v-editable="story.content">
		<h1 class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold">
			{{ pageTitle }}
		</h1>

		<v-card color="darkish" flat class="mt-0 mt-lg-5">
			<v-card-text v-if="story.content.text" class="pb-0">
				<rich-text-renderer :document="story.content.text" />
			</v-card-text>

			<v-form
				ref="contactForm"
				v-model="valid"
				:disabled="loading"
				name="contact"
				method="POST"
				action="/"
				data-netlify="true"
				netlify-honeypot="bot-field"
				@submit.prevent="handleSubmit"
			>
				<v-container class="pa-5">
					<input type="hidden" name="form-name" value="contact" />
					<div hidden aria-hidden="true">
						Don't fill this out if you're human: <input name="bot-field" />
					</div>
					<v-row class="mt-0">
						<v-col cols="12" md="7">
							<v-text-field
								v-model="name"
								color="bright"
								:rules="nameRules"
								name="name"
								label="Name*"
								hide-details="auto"
								filled
								outlined
								required
							></v-text-field>
						</v-col>

						<v-col cols="12" md="7">
							<v-text-field
								v-model="email"
								color="bright"
								:rules="emailRules"
								name="email"
								label="E-mail*"
								hide-details="auto"
								filled
								outlined
								required
							></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="12" md="10">
							<v-textarea
								v-model="message"
								color="bright"
								:rules="messageRules"
								name="message"
								label="Nachricht*"
								hide-details="auto"
								auto-grow
								filled
								outlined
								required
								height="200"
							></v-textarea>
						</v-col>
					</v-row>

					<v-row align="center" justify="end" class="mt-6">
						<v-col cols="12">
							<v-btn
								:disabled="loading"
								:loading="loading"
								:ripple="false"
								color="prime"
								depressed
								large
								min-width="190"
								class="btn"
								type="submit"
							>
								Senden<v-icon size="15" class="ml-2">$send</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card>

		<v-row align="center" class="pt-16 flex-column flex-md-row">
			<v-col cols="auto">
				<v-img
					alt="Logo Musikinitiative Irslingen 2019 e.V."
					:aspect-ratio="945 / 990"
					:src="require('~/assets/img/mii-logo.svg')"
					contain
					width="120"
				/>
			</v-col>
			<v-col class="text-center text-md-left">
				<h2>Musikinitiative Irslingen 2019 e.V.</h2>
				<p class="mb-1">
					<a href="/mii-mitgliedsantrag-2022.pdf" target="_blank"
						>Hier geht's zur Mitgliedschaft<v-icon
							size="15"
							class="ml-2 ahref--text"
							>$externalLink</v-icon
						></a
					>
				</p>
				<p>
					<a href="/mii-satzung.pdf" target="_blank"
						>Satzung der M.I.I.<v-icon size="15" class="ml-2 ahref--text"
							>$externalLink</v-icon
						></a
					>
				</p>
			</v-col>
		</v-row>

		<v-snackbar v-model="showSuccess" timeout="2000" color="good">
			Nachricht erfolgreich gesendet.

			<template #action="{ attrs }">
				<v-btn text v-bind="attrs" @click="showSuccess = false">
					Schließen
				</v-btn>
			</template>
		</v-snackbar>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.RECHTLICHES__KONTAKT.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useStorybridge],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data: () => ({
		pageTitle,
		loading: false,
		showSuccess: false,
		valid: false,
		name: '',
		nameRules: [v => !!v || 'Name darf nicht leer sein'],
		message: '',
		messageRules: [v => !!v || 'Nachricht darf nicht leer sein'],
		email: '',
		emailRules: [
			v => !!v || 'E-mail darf nicht leer sein',
			v => /.+@.+\..+/.test(v) || 'E-mail ungültig'
		]
	}),

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/kontakt'
		})
	},

	methods: {
		encode(data) {
			return Object.keys(data)
				.map(
					key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
				)
				.join('&')
		},
		handleSubmit() {
			this.$refs.contactForm.validate()

			if (this.valid) {
				this.loading = true

				const axiosConfig = {
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
						// 'Access-Control-Allow-Origin': '*',
						// Accept: '*/*'
					}
				}
				this.$axios
					.post(
						'/',
						this.encode({
							'form-name': 'contact',
							// ...this.form
							name: this.name,
							email: this.email,
							message: this.message
						}),
						axiosConfig
					)
					.then(res => {
						// console.log('res:', res.data.body)
						this.$refs.contactForm.reset()
						this.loading = false
						this.showSuccess = true
						// this.$router.push('/')
					})
					.catch(function (error) {
						this.loading = false
						console.error(error)
					})
			}
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.RECHTLICHES__KONTAKT }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
.btn {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;

	@media (max-width: 399px) {
		display: flex;
		flex: 1 0 auto;
		min-width: 100% !important;
	}
}
</style>
