<template>
	<section v-editable="story.content">
		<v-alert
			v-if="story.content.show_info_box"
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-10 information--text"
		>
			<rich-text-renderer
				v-if="story.content.info_box"
				:document="story.content.info_box"
			/>
		</v-alert>

		<!-- TODO: put text in festival infos and link from here -->
		<rich-text-renderer
			v-if="story.content.text"
			:document="story.content.text"
		/>

		<h2 class="mt-11">Tickets</h2>
		<v-card color="darkish" flat class="mt-3">
			<!-- TODO: make this a h2 or h3 -->
			<!-- <v-card-title>Tickets</v-card-title> -->
			<v-card-text
				v-for="ticket in story.content.tickets_list"
				:key="ticket.uuid"
			>
				{{ ticket.name }}
			</v-card-text>
		</v-card>

		<h2 class="mt-16 pb-3">Offizielle Vorverkaufstellen</h2>
		<v-row>
			<v-col
				v-for="vvk in story.content.vvk_places"
				:key="vvk._uid"
				cols="12"
				md="6"
			>
				<!-- TODO: make this h3 -->
				<b>{{ vvk.name }}</b>
				<br />
				<span v-if="vvk.additional_line">{{ vvk.additional_line }}<br /></span>
				{{ vvk.street }} {{ vvk.street_nr }}<br />
				{{ vvk.plz }} {{ vvk.city }}
			</v-col>
		</v-row>

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
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.TICKETS.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.story.content.image_social?.filename,
			this.$route.path
		)

		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
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
			successUrl: 'https://wolfweez.netlify.app/',
			cancelUrl: 'https://wolfweez-preview.netlify.app/'
		}
	},

	async asyncData(context) {
		// TODO: directly return
		const foo = await sbData({
			ctx: context,
			path: '/tickets/tickets',
			resolveRelations: 'tickets_list'
		})

		// FIXME: remove
		// console.log('foo:', foo)
		// console.log('foo:', foo.story.content.tickets_list)

		return foo
	},

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

<style lang="scss" scoped>
.v-alert ::v-deep p:last-child {
	margin: 0;
}
</style>
