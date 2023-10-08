<template>
	<section>
		<!-- <h1 class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold"> -->
		<h2
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5"
		>
			Festival Shirts
		</h2>

		<h3 class="mb-2">Spendenaktion für Merle</h3>
		<p>
			Der Erlös aus der Aktion kommt komplett Merle und ihrer Familie zugute.
			Wichtiger Hinweis zum Kauf: T-Shirts verfügbar so lange der Vorrat reicht
			(es sind keine großen Stückzahlen mehr vorhanden).
		</p>
		<p>
			Da wir das ganze kurzfristig eingerichtet haben kann es sein, dass euere
			Bestellung evtl. schon nicht mehr verfügbar ist. Wir überweisen dann das
			Geld selbstverständlich wieder zurück.
		</p>
		<p>Vielen herzlichen Dank für Eure Unterstützung!</p>

		<v-row class="mt-2">
			<v-col
				v-for="(btn, idx) in buyButtons"
				:key="`btn-${idx}-${btn.buyButtonId}`"
				cols="12"
				md="6"
				xl="4"
			>
				<stripe-buy-button
					:buy-button-id="btn.buyButtonId"
					:publishable-key="btn.publishableKey"
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
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.SHIRTS.title

export default {
	name: 'FestivalShirts',
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

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

	computed: {
		buyButtons() {
			// dev shirts
			if (process.env.NUXT_ENV_TEST_MODE === 'true') {
				const publishableKey =
					'pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc'
				return [
					{
						buyButtonId: 'buy_btn_1N1FRbBfAFuG6uOsivAE1Ky1',
						publishableKey
					},
					{
						buyButtonId: 'buy_btn_1N1FSHBfAFuG6uOs9Zh2CSw5',
						publishableKey
					},
					{
						buyButtonId: 'buy_btn_1N1FT0BfAFuG6uOsZJEy8VYi',
						publishableKey
					}
				]
			}

			// real shirts
			const publishableKey =
				'pk_live_51IP7XYBfAFuG6uOsT6iPXBc5tAIj8xOiOSDprjvToPCV3wrzchcqQe3p8WdZJbBvAYrMAUDaE7dg6GevBgzOwTMd00CXYTn8IM'
			return [
				{
					buyButtonId: 'buy_btn_1N1FI9BfAFuG6uOsL9PiiuUr',
					publishableKey
				},
				{
					buyButtonId: 'buy_btn_1N1FJWBfAFuG6uOsD9zu3u4J',
					publishableKey
				},
				{
					buyButtonId: 'buy_btn_1N1FLUBfAFuG6uOsZVBJrmx5',
					publishableKey
				}
			]
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.SHIRTS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
