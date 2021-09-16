<template>
	<section>
		<h1 class="d-none d-lg-flex text-h3 text-md-h2 font-weight-bold">
			{{ pageTitle }}
		</h1>

		<v-card color="darkish" flat class="mt-0 mt-lg-5">
			<v-form
				ref="contactForm"
				v-model="valid"
				:disabled="formDisabled"
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
					<v-row class="my-0">
						<v-col cols="12" md="6">
							<v-text-field
								v-model="name"
								:rules="nameRules"
								name="name"
								label="Name*"
								filled
								outlined
								required
							></v-text-field>
						</v-col>

						<v-col cols="12" md="6">
							<v-text-field
								v-model="email"
								:rules="emailRules"
								name="email"
								label="E-mail*"
								filled
								outlined
								required
							></v-text-field>
						</v-col>
					</v-row>

					<v-row class="my-0">
						<v-col cols="12" md="6">
							<v-textarea
								v-model="message"
								:rules="messageRules"
								name="message"
								label="Nachricht*"
								auto-grow
								filled
								outlined
								required
								height="200"
							></v-textarea>
						</v-col>
					</v-row>

					<v-row class="my-0">
						<v-col cols="12" md="4">
							<v-col cols="12" md="4">
								<v-btn
									:disabled="buttonDisabled"
									class="mr-4"
									color="prime"
									type="submit"
									>Submit</v-btn
								>
							</v-col>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card>

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
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.RECHTLICHES__KONTAKT.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data: () => ({
		pageTitle,
		buttonDisabled: false,
		formDisabled: false,
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
				this.buttonDisabled = true
				this.formDisabled = true

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
						this.buttonDisabled = false
						this.formDisabled = false
						this.showSuccess = true
						// this.$router.push('/')
					})
					.catch(function (error) {
						this.buttonDisabled = false
						this.formDisabled = false
						console.log(error)
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
