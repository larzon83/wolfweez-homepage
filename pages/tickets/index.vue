<template>
	<section v-editable="story.content">
		<h2 class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold">
			Tickets
		</h2>

		<v-alert
			v-if="story.content.show_info_box"
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-10 mt-0 mt-lg-5 information--text"
		>
			<rich-text-renderer
				v-if="story.content.info_box"
				:document="story.content.info_box"
			/>
		</v-alert>

		<div class="mx-n4 mx-md-0 mt-0 mt-lg-5">
			<v-card color="darkish" flat class="ticket-box">
				<v-card-text v-if="tickets.length" class="pa-4 pa-md-5">
					<!-- tickets -->
					<div
						v-for="(ticket, index) in tickets"
						:key="`ticket-${index}`"
						class="my-3"
					>
						<v-row
							v-show="
								ticket.name !== 'testticket' ||
								(ticket.name === 'testticket' &&
									$route.query.testticket === '1')
							"
							align="center"
							justify="start"
						>
							<!-- image -->
							<v-col
								cols="auto"
								md="3"
								lg="2"
								class="align-self-center align-self-md-start"
							>
								<SbImage
									v-if="ticket.imageSb && ticket.imageSb.filename"
									:alt="ticket.name"
									:pic="ticket.imageSb"
									:preset="$config.presetNames.TICKET"
									class="ticket-img"
								/>
								<v-img
									v-else
									:alt="ticket.name"
									:src="ticket.imageStripe"
									:aspect-ratio="$config.aspectRatios.TICKET"
									class="rounded ticket-img"
								/>
							</v-col>

							<v-col md="9" lg="10">
								<!-- title and order-buttons -->
								<v-row
									class="flex-column flex-md-row"
									align="center"
									justify="start"
								>
									<v-col>
										<h3 class="font-weight-medium">{{ ticket.name }}</h3>
										<v-chip
											:ripple="false"
											class="mt-1 mt-md-2 font-weight-bold"
											color="ahref"
											label
											outlined
											tag="div"
										>
											{{ ticket.price.formatted }}
										</v-chip>
									</v-col>
									<v-col
										cols="auto"
										class="d-flex align-center justify-start align-self-start align-self-md-center pt-1 pt-md-3"
									>
										<v-btn
											:disabled="
												!quantities[ticket.productId] ||
												quantities[ticket.productId] < 1
											"
											:aria-label="`${ticket.name} Anzahl verringern`"
											:ripple="{ center: true }"
											color="prime"
											depressed
											fab
											x-small
											@click="decreaseQuantity(ticket.productId)"
										>
											<v-icon>$minus</v-icon>
										</v-btn>
										<v-text-field
											v-model="quantities[ticket.productId]"
											:aria-label="`${ticket.name} Anzahl`"
											color="bright"
											type="number"
											dense
											filled
											hide-details="auto"
											inputmode="numeric"
											min="0"
											outlined
											placeholder="0"
											class="mx-3"
										/>
										<v-btn
											:aria-label="`${ticket.name} Anzahl erhöhen`"
											:ripple="{ center: true }"
											color="prime"
											depressed
											fab
											x-small
											@click="increaseQuantity(ticket.productId)"
										>
											<v-icon>$plus</v-icon>
										</v-btn>
									</v-col>
								</v-row>

								<!-- description ::: desktop -->
								<v-row
									v-if="ticket.textSb"
									justify="start"
									class="d-none d-md-flex flex-column flex-md-row"
								>
									<v-col cols="12" class="desc pt-2">
										<rich-text-renderer
											v-if="ticket.textSb"
											:document="ticket.textSb"
										/>
									</v-col>
								</v-row>
							</v-col>

							<!-- description ::: mobile -->
							<v-col v-if="ticket.textSb" cols="12" class="desc d-md-none">
								<rich-text-renderer
									v-if="ticket.textSb"
									:document="ticket.textSb"
								/>
							</v-col>

							<!-- divider after each product -->
							<v-col
								v-if="index !== realTicketsCount - 1"
								cols="12"
								md="9"
								lg="10"
								offset-md="3"
								offset-lg="2"
							>
								<v-divider />
							</v-col>
						</v-row>
					</div>

					<!-- final divider -->
					<v-row>
						<v-col cols="12">
							<v-divider />
						</v-col>
					</v-row>

					<!-- checkout amount details and button -->
					<v-row align="center" justify="space-between" class="mt-3">
						<v-col cols="12" md="auto" class="py-0 py-md-3">
							<div v-if="ticketsForCheckout.length">
								<div class="d-none d-md-block">
									<div class="font-weight-bold">Summe: {{ chargeAmount }}</div>
									<div class="shipping-amount">
										zzgl. {{ $_formatPrice(shippingRate.amount) }} Versandkosten
									</div>
								</div>
								<div class="d-block d-md-none">
									<span class="font-weight-bold">Summe: {{ chargeAmount }}</span
									>&nbsp;<span class="shipping-amount">
										(zzgl.
										{{ $_formatPrice(shippingRate.amount) }} Versand)
									</span>
								</div>
							</div>
							<div v-else>
								<div class="d-none d-md-block">
									<div class="font-weight-bold">&nbsp;</div>
									<div>&nbsp;</div>
								</div>
								<div class="d-block d-md-none">
									<span class="font-weight-bold">&nbsp;</span>
								</div>
							</div>
						</v-col>
						<v-col cols="12" md="auto" class="d-flex justify-md-end">
							<v-btn
								:disabled="loading"
								:loading="loading"
								:ripple="false"
								color="prime"
								depressed
								large
								min-width="190"
								class="btn-buy"
								@click="checkout"
							>
								Jetzt kaufen<v-icon size="15" class="ml-2"
									>$shoppingCart</v-icon
								>
							</v-btn>
						</v-col>
					</v-row>

					<!-- error box -->
					<v-alert v-if="checkoutError" class="bad mt-6 mb-0">
						<v-row>
							<v-col cols="12">
								<p>Bestellung nicht möglich.</p>
								<p><b>Fehlermeldung:</b> {{ checkoutError }}</p>
							</v-col>
						</v-row>
					</v-alert>
				</v-card-text>
			</v-card>
		</div>

		<div v-if="story.content.text" class="mt-8">
			<rich-text-renderer
				v-if="story.content.text"
				:document="story.content.text"
			/>
		</div>

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
	</section>
</template>

<script>
import Vue from 'vue'
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'
import { getShippingRates } from '~/utils/stripe-helpers'

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

		const linkEntries = []

		// only relevant for production, so, ignoring "devProducts"
		if (this.$stripeProducts.length) {
			const imgIndex = this.$stripeProducts[0].name === 'testticket' ? 1 : 0

			if (this.$stripeProducts[imgIndex]) {
				const preloadImage = this.$_getPreloadImageHeadEntry(
					this.$stripeProducts[imgIndex].imageSb?.filename,
					this.$config.presetNames.TICKET
				)
				if (preloadImage) linkEntries.push(preloadImage)
			}
		}

		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
				title,
				url: this.$route.path
			}),
			link: [...linkEntries]
		}
	},

	data() {
		return {
			pageTitle,
			checkoutError: '',
			devProducts: [],
			quantities: {},
			loading: false
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/tickets/tickets'
		})
	},

	computed: {
		tickets() {
			if (this.devProducts.length) return this.devProducts
			return this.$stripeProducts
		},

		realTicketsCount() {
			let count = this.tickets.length
			const hasTestTicket = this.tickets.find(t => t.name === 'testticket')
			if (hasTestTicket) count -= 1
			return count
		},

		ticketsForCheckout() {
			const tics = this.tickets.reduce((res, current) => {
				if (
					this.quantities[current.productId] &&
					this.quantities[current.productId] > 0
				) {
					res.push({
						amount: current.price.unit_amount,
						extraShipping: current.extraShipping,
						name: current.name,
						price: current.price.id,
						quantity: this.quantities[current.productId]
					})
				}
				return res
			}, [])

			return tics
		},

		shippingRate() {
			const testMode =
				process.env.NUXT_ENV_TEST_MODE === 'true' ? 'true' : 'false'

			const shippingRates = getShippingRates(testMode)

			if (!this.ticketsForCheckout.length) return shippingRates.sr350

			const hasExtraShipping = this.ticketsForCheckout.find(
				p => p.extraShipping
			)

			return hasExtraShipping ? shippingRates.sr450 : shippingRates.sr350
		},

		chargeAmount() {
			if (!this.ticketsForCheckout.length) return this.$_formatPrice(0)

			const sum = this.ticketsForCheckout.reduce((res, current) => {
				if (current.quantity > 0) {
					res += current.amount * current.quantity
				}
				return res
			}, 0)

			return this.$_formatPrice(sum)
		}
	},

	async mounted() {
		if (
			process.env.NUXT_ENV_TEST_MODE === 'true' &&
			window.location.host !== 'localhost:3000'
		) {
			console.info('loading products...')
			try {
				const products = await this.$axios.$get('/api/stripe-get-products')
				this.devProducts = products
				console.info('🚀 ~ products loaded', products)
			} catch (error) {
				console.error(error)
			}
		}
	},

	methods: {
		async checkout(event) {
			this.checkoutError = ''

			if (!this.ticketsForCheckout.length) {
				this.checkoutError = 'Kein Ticket ausgewählt'
				return
			}

			if (window.location.host === 'localhost:3000') {
				this.checkoutError = 'Netlify dev wird benötigt'
				return
			}

			this.loading = true

			try {
				const response = await this.$axios.$post(
					'/api/stripe-checkout',
					{
						items: this.ticketsForCheckout,
						shippingRate: this.shippingRate.id || ''
					},
					{
						headers: { 'Content-Type': 'application/json' }
					}
				)
				this.loading = false
				window.location.href = response.sessionUrl
			} catch (error) {
				this.loading = false
				this.checkoutError =
					error.response?.data?.raw?.message || error.message || error
				console.error(
					`Error: ${error.response?.data?.type} (${error.response?.data?.raw?.message})`
				)
			}
		},

		decreaseQuantity(productId) {
			const curr = parseInt(this.quantities[productId]) || 0
			if (curr > 0) {
				Vue.set(this.quantities, productId, (curr - 1).toString())
				this.checkoutError = ''
			}
		},

		increaseQuantity(productId) {
			const curr = parseInt(this.quantities[productId]) || 0
			Vue.set(this.quantities, productId, (curr + 1).toString())
			this.checkoutError = ''
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.TICKETS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
@media #{map-get($display-breakpoints, 'sm-and-down')} {
	.ticket-box {
		border-radius: 0;
	}

	.ticket-img {
		width: 115px;
	}
}

.v-chip:hover:before,
.v-chip:before {
	opacity: 0.06;
}

.desc {
	color: getcolor('bright', 0.8);
}

.shipping-amount {
	color: getcolor('bright', 0.45);
}

.btn-buy {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;

	@media (max-width: 399px) {
		display: flex;
		flex: 1 0 auto;
		min-width: 100% !important;
	}
}

.v-alert {
	::v-deep p:last-child {
		margin: 0;
	}

	a {
		color: currentColor;
	}
}

.v-text-field {
	width: 40px;
	max-width: 40px;

	::v-deep input[type='number'] {
		appearance: none;
		-moz-appearance: textfield;
		text-align: center;
		margin: 0;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			appearance: none;
			-moz-appearance: none;
			-webkit-appearance: none;
			margin: 0;
		}
	}
}
</style>
