<template>
	<section>
		<h1>{{ pageTitle }}</h1>
		<div class="mt-6 pa-4" style="background: rgba(255, 255, 255, 0.1)">
			<div ref="stripeElements" />
		</div>
		<v-btn
			:loading="loading"
			:disabled="loading"
			class="mt-3"
			color="prime"
			role="link"
			@click="checkout"
			>Kombi Ticket kaufen</v-btn
		>
		<div id="error-message"></div>
	</section>
</template>

<script>
// import { mapState } from 'vuex'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
// import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.TICKETS.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				// description: this.story.content.description_meta, // TODO:
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			pageTitle,
			loading: false,
			priceId: 'price_1IP7gWBfAFuG6uOs4a8hK5zz',
			successUrl: 'https://ww-test.netlify.app/',
			cancelUrl: 'https://ww-test-preview.netlify.app/'
		}
	},

	// async asyncData(context) {
	// 	return await sbData({
	// 		ctx: context,
	// 		path: '/fotogalerie'
	// 	})
	// },

	// computed: {
	// 	...mapState(['currentFestival', 'historicFestivals']),

	// 	galleries() {
	// 		const festivals = [{ ...this.currentFestival }, ...this.historicFestivals]
	// 		const festivalsWithGalleries = festivals.filter(
	// 			festival => festival.content.gallery.length > 0
	// 		)
	// 		return festivalsWithGalleries.map(festival => {
	// 			return {
	// 				year: festival.content.year,
	// 				imgs: festival.content.gallery
	// 			}
	// 		})
	// 	}
	// },

	// async mounted() {
	// 	const stripe = await this.$stripe()
	// 	console.log('stripe:', stripe)
	// 	const elements = stripe.elements()

	// 	const card = elements.create('card')
	// 	card.mount(this.$refs.stripeElements)
	// },

	methods: {
		async checkout(event) {
			this.loading = true
			const stripe = await this.$stripe()
			stripe
				.redirectToCheckout({
					lineItems: [{ price: this.priceId, quantity: 1 }],
					// Todo: handle fullfillment
					// https://stripe.com/docs/payments/checkout/fulfillment
					mode: 'payment',
					successUrl: this.successUrl,
					cancelUrl: this.cancelUrl
				})
				.then(function (result) {
					console.log('result:', result)
					if (result.error) {
						const displayError = document.getElementById('error-message')
						displayError.textContent = result.error.message
					}
				})
				.finally(() => {
					this.loading = false
				})
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.TICKETS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
