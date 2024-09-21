<template>
	<!-- WINTER SPECIAL -->
	<section v-if="showWinterspecialBuyButton">
		<LazyWinterspecialBuyButton>
			<h2 class="text-h4 font-weight-bold mb-4">
				Tickets Wolfweez Winter Special 2024
			</h2>
			<p>
				Weitere Infos zum Winter Special findet ihr
				<nuxt-link :to="winterSpecialLink">hier</nuxt-link>.
			</p>
		</LazyWinterspecialBuyButton>

		<h2 class="mt-10 pb-3">Offizielle Vorverkaufstellen</h2>
		<v-row>
			<template v-for="vvk in story.content.vvk_places">
				<v-col v-if="!vvk.disabled" :key="vvk._uid" cols="12" md="6">
					<b>{{ vvk.name }}</b>
					<br />
					<span v-if="vvk.additional_line"
						>{{ vvk.additional_line }}<br
					/></span>
					{{ vvk.street }} {{ vvk.street_nr }}<br />
					{{ vvk.plz }} {{ vvk.city }}
				</v-col>
			</template>
		</v-row>
	</section>

	<!-- IN-ACTIVE -->
	<section v-else-if="!pageIsActive">
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

		<div v-if="story.content.show_page_inactive_box" class="mt-8">
			<rich-text-renderer
				v-if="story.content.text_page_inactive"
				:document="story.content.text_page_inactive"
			/>
		</div>

		<!-- NOTE: duplicated this from below; lazy... :) -->
		<h2 class="mt-16 pb-3">Offizielle Vorverkaufstellen</h2>
		<v-row>
			<template v-for="vvk in story.content.vvk_places">
				<v-col v-if="!vvk.disabled" :key="vvk._uid" cols="12" md="6">
					<!-- TODO: make this h3 -->
					<b>{{ vvk.name }}</b>
					<br />
					<span v-if="vvk.additional_line"
						>{{ vvk.additional_line }}<br
					/></span>
					{{ vvk.street }} {{ vvk.street_nr }}<br />
					{{ vvk.plz }} {{ vvk.city }}
				</v-col>
			</template>
		</v-row>
	</section>

	<!-- ACTIVE -->
	<section v-else v-editable="story.content">
		<h2 class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold">
			Tickets
		</h2>

		<v-alert
			v-if="story.content.show_warning_box"
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-10 mt-0 mt-lg-5 warning--text"
		>
			<rich-text-renderer
				v-if="story.content.warning_box"
				:document="story.content.warning_box"
			/>
		</v-alert>

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
										<div class="price-wrapper d-flex align-center mt-1 mt-md-2">
											<v-chip
												:ripple="false"
												class="font-weight-bold flex-shrink-0"
												color="ahref"
												label
												outlined
												tag="div"
											>
												{{ ticket.price.formatted }}
											</v-chip>
											<small v-if="!ticket.noVvk" class="vvk"
												>inkl. 2€ VVK-Gebühr</small
											>
										</div>
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
						<v-col cols="12" lg="auto" class="py-0 py-lg-3">
							<div v-if="ticketsForCheckout.length && shippingRate.id">
								<div>
									<div class="font-weight-bold">Summe: {{ chargeAmount }}</div>
									<div class="shipping-amount">
										zzgl. {{ shippingRate.amountTotal }} Versandkosten
									</div>
								</div>
							</div>
							<div v-else>
								<div class="d-none d-lg-block">
									<div class="font-weight-bold">&nbsp;</div>
									<div>&nbsp;</div>
								</div>
							</div>
						</v-col>
						<v-col cols="12" lg="auto" class="d-flex justify-lg-end">
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

		<v-alert
			icon="$info"
			dense
			prominent
			color="information"
			class="pa-4 mb-10 mt-0 mt-lg-5"
		>
			<p>
				<b>Unterkünfte</b><br />
				Finde passende Unterkünfte in Irslingen und Umgebung:
				<a
					href="https://www.google.de/search?q=78661+unterk%C3%BCnfte&sxsrf=ALiCzsaTM31Eyr2jXPJt483ULVV5baTkow:1670278852176&source=hp&ei=xG6OY9eRBIWD9u8Po_iBgAE&iflsig=AJiK0e8AAAAAY4581Og8KVaDz8FkCfWrCG5F--5YIxGQ&ved=0ahUKEwjXg53NweP7AhWFgf0HHSN8ABAQ4dUDCAo&uact=5&oq=78661+unterk%C3%BCnfte&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEKIEMgUIABCiBDIFCAAQogQyBQgAEKIEMgUIABCiBDoECCMQJzoFCAAQgAQ6BQguEIAEOggIABCABBDLAToECAAQHjoGCAAQHhAPOgIIJjoFCCEQoAE6BwghEKABEApQAFjdR2D9SWgAcAB4AIABbogB_AeSAQQxMi4xmAEAoAECoAEB&sclient=gws-wiz&pccc=1"
					rel="nofollow noopener"
					target="_blank"
					>Google Suche</a
				>
			</p>
		</v-alert>

		<h2 class="mt-16 pb-3">Offizielle Vorverkaufstellen</h2>
		<v-row>
			<template v-for="vvk in story.content.vvk_places">
				<v-col v-if="!vvk.disabled" :key="vvk._uid" cols="12" md="6">
					<!-- TODO: make this h3 -->
					<b>{{ vvk.name }}</b>
					<br />
					<span v-if="vvk.additional_line"
						>{{ vvk.additional_line }}<br
					/></span>
					{{ vvk.street }} {{ vvk.street_nr }}<br />
					{{ vvk.plz }} {{ vvk.city }}
				</v-col>
			</template>
		</v-row>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import { mapState } from 'vuex'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.TICKETS.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	// IN-ACTIVE
	// head() {
	// 	const title = pageTitle
	// 	return {
	// 		title,
	// 		meta: createSEOMeta({
	// 			image: createOgImagePath(this.$route.path),
	// 			imageAlt: title,
	// 			title,
	// 			url: this.$route.path
	// 		})
	// 	}
	// },

	// ACTIVE
	head() {
		const title = pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.story.content.image_social?.filename,
			this.$route.path
		)

		const linkEntries = []

		// only relevant for production, so, ignoring "devProducts"
		if (this.$stripeProducts.length) {
			const imgIndex = this.$stripeProducts[0]?.name === 'testticket' ? 1 : 0

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
			// pageIsActive:
			// 	process.env.NODE_ENV === 'development' ||
			// 	process.env.NUXT_ENV_IS_SPA === 'true' ||
			// 	process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true',
			pageIsActive: false,
			pageTitle,
			checkoutError: '',
			devProducts: [],
			devShippingRates: [],
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
		...mapState(['showWinterspecialBuyButton']),
		tickets() {
			if (this.devProducts.length) return this.devProducts
			return this.$stripeProducts
		},

		shippingRates() {
			if (this.devShippingRates.length) return this.devShippingRates
			return this.$stripeShippingRates
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
						noVvk: current.noVvk,
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
			// const shippingBase = this.shippingRates.find(
			// 	s => s.ident === 'shippingBase'
			// )
			// const shippingExtended = this.shippingRates.find(
			// 	s => s.ident === 'shippingExtended'
			// )

			// if (!this.ticketsForCheckout.length) return shippingBase

			// const hasExtraShipping = this.ticketsForCheckout.find(
			// 	p => p.extraShipping
			// )

			// return hasExtraShipping ? shippingExtended : shippingBase

			const currentShippingRate = this.shippingRates.find(
				s => s.ident === 'currentShippingRate'
			)
			return currentShippingRate || {}
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

	created() {
		this.winterSpecialLink = routeMeta.WINTERSPECIAL.to
	},

	async mounted() {
		if (
			process.env.NUXT_ENV_TEST_MODE === 'true' &&
			window.location.host !== 'localhost:3000'
		) {
			console.info('loading products...')
			try {
				const result = await this.$axios.$get('/api/stripe-get-products')
				this.devProducts = result.products
				this.devShippingRates = result.shippingRates
				console.info('🚀 ~ products loaded', result.products)
				console.info('🚀 ~ shippingRates loaded', result.shippingRates)
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

			if (!this.shippingRate.id) {
				this.checkoutError = 'Versandkosten konnten nicht ermittelt werden'
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
				this.$set(this.quantities, productId, (curr - 1).toString())
				this.checkoutError = ''
			}
		},

		increaseQuantity(productId) {
			const curr = parseInt(this.quantities[productId]) || 0
			this.$set(this.quantities, productId, (curr + 1).toString())
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

.price-wrapper {
	gap: 8px;
}

.desc,
.vvk {
	color: getcolor('bright', 0.8);
}

.vvk {
	line-height: normal;
}

.shipping-amount {
	color: getcolor('bright', 0.45);
}

.btn-buy {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;

	@media (max-width: 783px) {
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
