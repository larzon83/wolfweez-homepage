<template>
	<div>
		<h1 class="text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-5">
			Ticket {{ pageTitle }}
		</h1>

		<div v-show="hasCorrectRouteQueries">
			<div v-show="showReceipt">
				<LazyCheckoutStatusBox
					v-if="sessionItem && chargeItem"
					class="good"
					headline="Bestellung erfolgreich"
					icon="$checkCircle"
				>
					<!-- FIXME: check again in prod: is there an invoice with other details? -->
					<!-- TODO: handle payment_status: "unpaid" -->
					<!-- TODO: better copy -->
					<v-row align="start" justify="start">
						<v-col cols="12" xl="6">
							<v-subheader class="sub-headline text-button pl-0">
								Übersicht
							</v-subheader>

							<v-card flat class="products-box">
								<v-card-text class="py-4">
									<v-row
										v-for="(item, index) in sessionItem.line_items"
										:key="item.id"
										align="center"
										justify="space-between"
										:class="{ 'mt-0': index !== 0 }"
									>
										<v-col>{{ item.description }} × {{ item.quantity }}</v-col>
										<v-col cols="auto"
											>{{ formatPrice(item.amount_total) }} €</v-col
										>
									</v-row>

									<v-row align="center" justify="space-between">
										<v-col cols="12" class="pa-0"><v-divider /></v-col>
									</v-row>
									<v-row align="center" justify="space-between">
										<v-col>Zwischensumme</v-col>
										<!-- TODO: currency -->
										<v-col cols="auto"
											>{{ formatPrice(sessionItem.amount_subtotal) }} €</v-col
										>
									</v-row>
									<v-row align="center" justify="space-between" class="mt-0">
										<v-col>Versand</v-col>
										<!-- TODO: currency -->
										<v-col cols="auto"
											>{{
												formatPrice(sessionItem.total_details.amount_shipping)
											}}
											€</v-col
										>
									</v-row>
									<v-row align="center" justify="space-between" class="mt-0">
										<v-col class="font-weight-bold">Gesamtbetrag</v-col>
										<!-- TODO: currency -->
										<v-col cols="auto" class="font-weight-bold"
											>{{ formatPrice(chargeItem.amount) }} €</v-col
										>
									</v-row>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" xl="5" offset-xl="1">
							<v-subheader class="sub-headline text-button pl-0">
								Versand an
							</v-subheader>
							<div v-if="sessionItem.shipping && sessionItem.shipping.address">
								<span v-if="sessionItem.shipping.name">
									{{ sessionItem.shipping.name }}<br />
								</span>
								<span v-if="sessionItem.shipping.address.line1">
									{{ sessionItem.shipping.address.line1 }}<br />
								</span>
								<span v-if="sessionItem.shipping.address.line2">
									{{ sessionItem.shipping.address.line2 }}<br />
								</span>
								<span v-if="sessionItem.shipping.address.postal_code">
									{{ sessionItem.shipping.address.postal_code }}
									{{ sessionItem.shipping.address.city }}<br />
								</span>
								<span v-if="sessionItem.shipping.address.country">
									{{ sessionItem.shipping.address.country }}<br />
								</span>
							</div>
						</v-col>
					</v-row>

					<!-- TODO: make look better -->
					<v-btn
						v-if="chargeItem.receipt_url"
						:ripple="false"
						:href="chargeItem.receipt_url"
						rel="noopener noreferrer"
						target="_blank"
						role="link"
						color="bright"
						depressed
						large
						min-width="190"
						class="btn-receipt darkish--text mt-8"
					>
						Zahlungsbeleg anzeigen<v-icon size="15" class="ml-2"
							>$externalLink</v-icon
						>
					</v-btn>
				</LazyCheckoutStatusBox>

				<LazyCheckoutStatusBox
					v-else-if="sessionError"
					class="bad"
					headline="Fehler"
					icon="$alertOctagon"
				>
					<p>Der Bestellstatus konnte nicht ermittelt werden.</p>
					<p><b>Fehlermeldung:</b> {{ sessionError }}</p>
				</LazyCheckoutStatusBox>
			</div>
			<v-skeleton-loader v-show="!showReceipt" type="image"></v-skeleton-loader>
		</div>

		<GoBackHeader
			:route="ticketsOverviewRoute"
			label="zur Tickets Übersicht"
			class="mt-5"
		/>
	</div>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { countryNames, routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.TICKETS__STATUS.title

export default {
	name: 'ReceiptStatus',
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

	data() {
		return {
			pageTitle,
			showReceipt: false,
			chargeItem: undefined,
			sessionItem: undefined,
			sessionError: null
		}
	},

	computed: {
		hasCorrectRouteQueries() {
			console.log('this.$route.query.status:', this.$route.query.status)
			console.log('this.$route.query.session_id:', this.$route.query.session_id)
			return (
				this.$route.query.status === 'success' && this.$route.query.session_id
			)
		}
	},

	async mounted() {
		console.log('this.hasCorrectRouteQueries:', this.hasCorrectRouteQueries)
		if (this.hasCorrectRouteQueries) {
			console.log('before try')
			try {
				console.log('trying...')
				const { session, charge } = await this.$axios.$get(
					'/api/stripe-get-checkout-session?sessionId=' +
						this.$route.query.session_id
				)

				if (session?.shipping?.address?.country) {
					session.shipping.address.country =
						countryNames[session.shipping.address.country] || ''
				}

				console.log('session:', session)

				this.sessionItem = session
				this.chargeItem = charge
				this.showReceipt = true
			} catch (error) {
				console.log('oh noooooooo')
				this.showReceipt = true
				this.sessionError = error.response?.data?.raw?.message
				console.error(
					`Error: ${error.response?.data?.type} (${error.response?.data?.raw?.message})`
				)
			}
		}
	},

	created() {
		this.ticketsOverviewRoute = routeMeta.TICKETS.to
	},

	methods: {
		// TODO: decimal separator
		formatPrice(price) {
			return (price / 100).toFixed(2)
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.TICKETS }, { ...routeMeta.TICKETS__STATUS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}

// amount_subtotal: 49500
// amount_total: 49500
// currency
// customer: "cus_KGpT4RU4TtuKbr"
// customer_email ?
// customer_details: Object
// 	email: "brunooo@gmx.de"
// expires_at: 1632345674
// id: "cs_test_b1CIso0LeZPMWlBJcn6EbHTioHk0NHwTGGvdO6dsDfpywUeXuDgFRI10Oj"
// payment_intent: "pi_3JcGOsBfAFuG6uOs0aoRILei"
// payment_status: "unpaid" || payment_status: "paid"
// shipping: Object
// 	name: "Dominic Schwarz"
// 	address: Object
// 		city: "Freiburg im Breisgau"
// 		country: "DE"
// 		line1: "Wannerstraße 2"
// 		line2: null
// 		postal_code: "79106"
// 		state: ""
// total_details: Object
// 	amount_discount: 0
// 	amount_shipping: 0
// url: "https://checkout.stripe.com/pay/cs_test_b1CIso0LeZPMWlBJcn6EbHTioHk0NHwTGGvdO6dsDfpywUeXuDgFRI10Oj..."
</script>

<style lang="scss" scoped>
.sub-headline {
	color: getcolor('bright', 0.64);
	font-weight: 700;
}

.products-box {
	background-color: getcolor('dark', 0.16);
}

@media (max-width: 399px) {
	.btn-receipt {
		display: flex;
		flex: 1 0 auto;
		min-width: 100% !important;
	}
}

.v-skeleton-loader__image {
	height: 250px;
}
</style>
