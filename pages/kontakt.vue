<template>
	<section>
		<iframe
			width="540"
			height="305"
			src="https://6c9e3ba7.sibforms.com/serve/MUIEANEZ_xie6gWCyngw08OABj_v2S5GtX1JMorlFXNiVCIolGfPlFriArpHAUWW3zyL_ohhBbG-WKgXfNSyYtN6hJfjtv5U1uUfXvHgK5C9EWpFMulA-4e2Jxv5aAVlltOqb3-DQGnudLqU6euZFdlRfnI5a8DuGu3iOBFzafUTedSgw749Q7plnyFVGnWLKiJVXcngK3Fe13-A"
			frameborder="0"
			scrolling="auto"
			allowfullscreen
			style="
				display: block;
				margin-left: auto;
				margin-right: auto;
				max-width: 100%;
			"
		></iframe>

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
			<v-container>
				<input type="hidden" name="form-name" value="contact" />
				<div hidden aria-hidden="true">
					Don’t fill this out if you're human: <input name="bot-field" />
				</div>
				<v-row>
					<v-col cols="12" md="6">
						<v-text-field
							v-model="name"
							:rules="nameRules"
							name="name"
							label="Name*"
							required
						></v-text-field>
					</v-col>

					<v-col cols="12" md="6">
						<v-text-field
							v-model="email"
							:rules="emailRules"
							name="email"
							label="E-mail*"
							required
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" md="6">
						<v-textarea
							v-model="message"
							:rules="messageRules"
							name="message"
							label="Nachricht*"
							required
							filled
							auto-grow
							height="200"
						></v-textarea>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" md="4">
						<v-col cols="12" md="4">
							<v-btn
								:disabled="buttonDisabled"
								class="mr-4"
								color="primary"
								type="submit"
								>Submit</v-btn
							>
						</v-col>
					</v-col>
				</v-row>
			</v-container>
		</v-form>

		<v-snackbar v-model="showSuccess" timeout="2000" color="success">
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
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Kontakt'

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
	}
}
</script>
