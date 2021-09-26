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
			<!-- FIXME: remove sb Tickets -->
			<!-- <v-card-text
				v-for="ticket in story.content.tickets_list"
				:key="ticket.uuid"
			>
				{{ ticket.name }}
			</v-card-text>

			<v-divider /> -->

			<v-card-text v-if="tickets.length">
				<v-row
					v-for="(ticket, index) in tickets"
					:key="`ticket-${index}`"
					align="center"
					justify="space-between"
				>
					<v-col>{{ ticket.name }}<br />{{ ticket.price.formatted }} €</v-col>
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

				<v-row align="center" justify="end" class="mt-12">
					<v-col cols="12">
						<v-divider />
					</v-col>
					<v-col cols="auto">
						<v-btn
							:loading="loading"
							:disabled="!ticketsForCheckout.length || loading"
							color="prime"
							role="link"
							@click="checkout"
							>Jetzt kaufen</v-btn
						>
					</v-col>
				</v-row>
				<!-- TODO: add shipping_rate manually -->
				<v-row v-if="checkoutError">
					<v-col cols="12">
						<p>Bestellung nicht möglich.</p>
						<p><b>Fehlermeldung:</b> {{ checkoutError }}</p>
					</v-col>
				</v-row>
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
			checkoutError: '',
			devProducts: [],
			quantities: {},
			loading: false
		}
	},

	async asyncData(context) {
		// TODO: directly return
		const foo = await sbData({
			ctx: context,
			path: '/tickets/tickets',
			resolveRelations: 'tickets_list'
		})

		return foo
	},

	computed: {
		tickets() {
			const productsRaw = this.devProducts.length
				? this.devProducts
				: this.$stripeProducts

			const tickets = productsRaw.map(({ id, images, name, prices }) => ({
				productId: id,
				images,
				name,
				price: {
					id: prices[0].id,
					currency: prices[0].currency,
					unit_amount: prices[0].unit_amount,
					unit_amount_decimal: prices[0].unit_amount_decimal,
					formatted: this.formatPrice(prices[0].unit_amount)
				}
			}))

			return tickets
		},

		ticketsForCheckout() {
			const tics = this.tickets.reduce((res, current) => {
				if (
					this.quantities[current.productId] &&
					this.quantities[current.productId] > 0
				) {
					res.push({
						price: current.price.id,
						quantity: this.quantities[current.productId]
					})
				}
				return res
			}, [])

			return tics
		}
	},

	async mounted() {
		if (
			process.env.NODE_ENV === 'development' ||
			process.env.NUXT_ENV_IS_SPA === 'true'
		) {
			console.log('loading products...')
			try {
				const products = await this.$axios.$get('/api/stripe-get-products')
				console.log('products:', products)
				this.devProducts = products
			} catch (error) {
				console.log(error)
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
					this.ticketsForCheckout,
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

		// TODO: put in utils and use in status, too
		// TODO: decimal separator
		formatPrice(price) {
			return (price / 100).toFixed(2)
		},

		decreaseQuantity(productId) {
			const curr = parseInt(this.quantities[productId]) || 0
			if (curr > 0) {
				Vue.set(this.quantities, productId, (curr - 1).toString())
			}
		},

		increaseQuantity(productId) {
			const curr = parseInt(this.quantities[productId]) || 0
			Vue.set(this.quantities, productId, (curr + 1).toString())
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
