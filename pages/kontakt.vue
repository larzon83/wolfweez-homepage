<template>
	<section>
		<v-form
			v-model="valid"
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
							v-model="firstname"
							:rules="nameRules"
							label="First name"
							required
							name="firstname"
						></v-text-field>
					</v-col>

					<v-col cols="12" md="6">
						<v-text-field
							v-model="email"
							:rules="emailRules"
							label="E-mail"
							required
							name="email"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" md="6">
						<v-textarea
							v-model="message"
							name="message"
							filled
							label="Text"
							auto-grow
							value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
						></v-textarea>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12" md="4">
						<v-col cols="12" md="4">
							<v-btn class="mr-4" color="primary" type="submit">Submit</v-btn>
						</v-col>
					</v-col>
				</v-row>
			</v-container>
		</v-form>

		<!-- <form name="contact" method="POST" data-netlify="true">
			<p>
				<label>Your Name: <input type="text" name="name" /></label>
			</p>
			<p>
				<label>Your Email: <input type="email" name="email" /></label>
			</p>
			<p>
				<label
					>Your Role:
					<select name="role[]" multiple>
						<option value="leader">Leader</option>
						<option value="follower">Follower</option>
					</select></label
				>
			</p>
			<p>
				<label>Message: <textarea name="message"></textarea></label>
			</p>
			<p>
				<button type="submit">Send</button>
			</p>
		</form> -->
	</section>
</template>

<script>
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'Kontakt',

	head() {
		const title = 'Kontakt'
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
		valid: false,
		firstname: '',
		lastname: '',
		message: '',
		nameRules: [v => !!v || 'Name is required'],
		email: '',
		emailRules: [
			v => !!v || 'E-mail is required',
			v => /.+@.+/.test(v) || 'E-mail must be valid'
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
			const axiosConfig = {
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Origin': '*',
					Accept: '*/*'
				}
			}
			this.$axios
				.post(
					'/',
					this.encode({
						'form-name': 'contact',
						// ...this.form
						firstname: this.firstname,
						email: this.email,
						message: this.message
					}),
					axiosConfig
				)
				.then(res => console.log('res:', res))
		}
	}
}
</script>
