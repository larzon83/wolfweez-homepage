<template>
	<section>
		<h2 class="text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5">
			Festival Shirts
		</h2>

		<v-row tag="section">
			<v-col cols="12" md="6" xl="4">
				<stripe-buy-button
					buy-button-id="buy_btn_1N15TGBfAFuG6uOsIIQJQ65k"
					publishable-key="pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc"
				>
				</stripe-buy-button>
			</v-col>
			<v-col cols="12" md="6" xl="4">
				<stripe-buy-button
					buy-button-id="buy_btn_1N15TGBfAFuG6uOsIIQJQ65k"
					publishable-key="pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc"
				>
				</stripe-buy-button>
			</v-col>
			<v-col cols="12" md="6" xl="4">
				<stripe-buy-button
					buy-button-id="buy_btn_1N15TGBfAFuG6uOsIIQJQ65k"
					publishable-key="pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc"
				>
				</stripe-buy-button>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Festival Shirts'

export default {
	name: 'FestivalShirts',
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	// IN-ACTIVE
	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			}),
			script: [
				{
					src: 'https://js.stripe.com/v3/buy-button.js',
					async: true
				}
			]
		}
	},

	middleware({ store }) {
		// TODO:
		const crumbs = [{ title: pageTitle, to: '/shirts/' }]
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
