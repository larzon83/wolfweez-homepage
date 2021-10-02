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
			<v-card-text v-if="tickets.length">
				<v-row
					v-for="(ticket, index) in tickets"
					:key="`ticket-${index}`"
					align="center"
					justify="space-between"
				>
					<v-col>
						<v-img
							:alt="ticket.name"
							:src="ticketsImages[ticket.productId].src"
							:lazy-src="ticketsImages[ticket.productId].lazySrc"
							:srcset="ticketsImages[ticket.productId].srcset"
							aspect-ratio="1"
							class="rounded"
						/>
					</v-col>
					<v-col>{{ ticket.name }}<br />{{ ticket.price.formatted }}</v-col>
					<v-col cols="auto" class="d-flex align-center justify-center">
						<v-btn
							:disabled="
								!quantities[ticket.productId] ||
								quantities[ticket.productId] < 1
							"
							color="prime"
							depressed
							fab
							small
							@click="decreaseQuantity(ticket.productId)"
						>
							<v-icon>$minus</v-icon>
						</v-btn>
						<v-text-field
							v-model="quantities[ticket.productId]"
							color="bright"
							type="number"
							filled
							hide-details="auto"
							inputmode="numeric"
							min="0"
							outlined
							placeholder="0"
							class="mx-2"
						/>
						<v-btn
							color="prime"
							depressed
							fab
							small
							@click="increaseQuantity(ticket.productId)"
						>
							<v-icon>$plus</v-icon>
						</v-btn>
					</v-col>
				</v-row>

				<v-divider class="mt-15" />

				<div>Versand: {{ $_formatPrice(shippingRate.amount) }}</div>
				<div>Gesamt: {{ chargeAmount }}</div>

				<v-row align="center" justify="end" class="mt-3">
					<v-col cols="12" class="d-flex justify-end">
						<v-btn
							:disabled="loading"
							:loading="loading"
							:ripple="false"
							color="prime"
							large
							min-width="190"
							class="btn"
							@click="checkout"
						>
							Jetzt kaufen<v-icon size="15" class="ml-2">$shoppingCart</v-icon>
						</v-btn>
					</v-col>
				</v-row>
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
import { imageFormats } from '~/utils/responsive-images'
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

		ticketsImages() {
			const images = {}

			this.tickets.forEach(t => {
				let src
				let lazySrc
				let srcset

				if (t.imageSb) {
					src = this.$_transformImage(t.imageSb, '218x218')
					lazySrc = this.$_transformImage(t.imageSb, '6x6')
					srcset = this.$_generateDpiSrcsetEntries(
						t.imageSb,
						218,
						// TODO: use png
						imageFormats.JPEG
					)
				} else {
					src = t.imageStripe
				}
				images[t.productId] = { src, lazySrc, srcset }
			})

			return images
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
			}, this.shippingRate.amount || 0)

			return this.$_formatPrice(sum)
		}
	},

	// TODO: what happens in dev-mode when not using netlify dev?
	async mounted() {
		if (process.env.NUXT_ENV_TEST_MODE === 'true') {
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
				this.checkoutError = 'Mindestens ein Ticket mit Menge nötig.'
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
				this.checkoutError = error.response?.data?.raw?.message
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
.btn {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;

	@media (max-width: 399px) {
		display: flex;
		flex: 1 0 auto;
		min-width: 100% !important;
	}
}

.v-alert ::v-deep p:last-child {
	margin: 0;
}

.v-text-field {
	width: 56px;

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
