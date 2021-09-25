<template>
	<div>
		<h1 class="text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-5">
			Ticket {{ pageTitle }}
		</h1>

		<template v-if="hasCorrectRouteQueries">
			<template v-if="showReceipt">
				<LazyCheckoutStatusBox
					v-if="sessionItem && chargeItem"
					class="good"
					headline="Bestellung erfolgreich"
					icon="$checkCircle"
				>
					<!-- FIXME: check again in prod: is there an invoice with other details? -->
					<!-- TODO: handle unpaid -->
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
									<template v-if="sessionItem.line_items.length > 1">
										<v-row
											align="center"
											justify="space-between"
											class="font-weight-bold"
										>
											<v-col cols="12" class="pa-0"><v-divider /></v-col>
											<v-col>Gesamtbetrag</v-col>
											<!-- TODO: currency -->
											<v-col cols="auto"
												>{{ formatPrice(chargeItem.amount) }} €</v-col
											>
										</v-row>
									</template>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12" xl="5" offset-xl="1">
							<v-subheader class="sub-headline text-button pl-0">
								Versand an
							</v-subheader>
							<div v-if="sessionItem.shipping && sessionItem.shipping.address">
								<span v-if="sessionInfo.customer.name">
									{{ sessionInfo.customer.name }}<br />
								</span>
								<span v-if="sessionInfo.customer.street">
									{{ sessionInfo.customer.street }}<br />
								</span>
								<span v-if="sessionInfo.customer.street_additional">
									{{ sessionInfo.customer.street_additional }}<br />
								</span>
								<span v-if="sessionInfo.customer.zip">
									{{ sessionInfo.customer.zip }} {{ sessionInfo.customer.city
									}}<br />
								</span>
								<span v-if="sessionItem.shipping.address.country">
									{{ sessionItem.shipping.address.country }}<br />
								</span>
							</div>
						</v-col>
					</v-row>

					<v-btn
						v-if="chargeItem.receipt_url"
						:ripple="false"
						:href="chargeItem.receipt_url"
						rel="noopener noreferrer"
						target="_blank"
						color="bright"
						role="link"
						class="btn-receipt darkish--text mt-8"
						depressed
						>Zahlungsbeleg anzeigen</v-btn
					>
				</LazyCheckoutStatusBox>

				<LazyCheckoutStatusBox
					v-else-if="sessionError"
					class="bad"
					headline="Fehler"
					icon="$alertOctagon"
				>
					<p>Der Bestellstatus konnt nicht ermittelt werden.</p>
					<p><b>Fehlermeldung:</b> {{ sessionError }}</p>
				</LazyCheckoutStatusBox>
			</template>
			<v-skeleton-loader v-else type="image"></v-skeleton-loader>
		</template>

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
			// receiptUrl: '',
			showReceipt: false,
			sessionInfo: undefined,
			chargeItem: undefined,
			sessionItem: undefined,
			sessionError: null
		}
	},

	computed: {
		hasCorrectRouteQueries() {
			return (
				this.$route.query.status === 'success' && this.$route.query.session_id
			)
		}
	},

	async mounted() {
		if (this.hasCorrectRouteQueries) {
			try {
				const { session, charge } = await this.$axios.$get(
					'/api/stripe-get-checkout-session?sessionId=' +
						this.$route.query.session_id
				)

				// TODO: handle payment_status: "unpaid"
				const enrichedSession = {
					amount: (session.amount_total / 100).toFixed(2),
					customer: {
						// TODO: Rechnungs Nummer?
						email: session.customer_details?.email,
						name: session.shipping?.name,
						street: session.shipping?.address?.line1,
						street_additional: session.shipping?.address?.line2,
						zip: session.shipping?.address?.postal_code,
						city: session.shipping?.address?.city,
						country: session.shipping?.address?.country
					}
				}

				if (session?.shipping?.address?.country) {
					session.shipping.address.country =
						countryNames[session.shipping.address.country] || ''
				}

				console.log('session:', session)

				this.sessionItem = session
				this.chargeItem = charge

				this.showReceipt = true
				// this.receiptUrl = charge.receipt_url
				this.sessionInfo = enrichedSession
			} catch (error) {
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
		max-width: auto;
	}
}

.v-skeleton-loader__image {
	height: 250px;
}
</style>
