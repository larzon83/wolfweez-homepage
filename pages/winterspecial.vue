<template>
	<section>
		<h2 class="text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5">
			Wolfweez Winter Special
		</h2>

		<h3 class="mb-2">Das Indoor Wolfweez Feeling für die kälteren Tage</h3>
		<p>
			Ein Abend voller Heavymetal, im Wolfweez OpenAir Festival Style in der
			Waidbachhalle in Irslingen!
		</p>
		<p>
			Mit dabei ist die VOLBEAT Tribute Band -
			<a
				href="https://www.voltbeat.de/"
				target="_blank"
				rel="noopener noreferrer"
				>VOLTBEAT</a
			>!🤩🔥🤘<br />
			+ Support Band!😎🤘
		</p>

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
		<ul>
			<li>Samstag, 02.12.2023</li>
			<li>Waidbachhalle Irslingen</li>
			<li>Einlass: 19 Uhr</li>
			<li>Beginn: 20 Uhr</li>
		</ul>
		<br />

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
		<v-alert
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-6 mt-0 mt-lg-5 information--text"
		>
			Ticket Verkauf startet in Kürze
		</v-alert>

		<p>
			Hard-Tickets sind ebenfalls in allen offiziellen VVK-Stellen erhältlich
			(Infos folgen), sowie bei Eventim und ReserviX.
		</p>

		<p>
			Und natürlich (sofern nicht ausverkauft) an der Abendkasse (hier aber
			deutlich teurer).
		</p>

		<!-- <v-row class="mt-2">
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
		</v-row> -->
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Wolfweez Winterspecial'

export default {
	name: 'WolfweezWinterspecial',
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
			// dev
			if (process.env.NUXT_ENV_TEST_MODE === 'true') {
				const publishableKey =
					'pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc'
				return [
					{
						buyButtonId: 'buy_btn_1Nxz9cBfAFuG6uOsdN1aBgNE',
						publishableKey
					}
				]
			}

			// real
			const publishableKey =
				'pk_live_51IP7XYBfAFuG6uOsT6iPXBc5tAIj8xOiOSDprjvToPCV3wrzchcqQe3p8WdZJbBvAYrMAUDaE7dg6GevBgzOwTMd00CXYTn8IM'
			return [
				{
					buyButtonId: 'buy_btn_1NxzCiBfAFuG6uOsYfznllyQ',
					publishableKey
				}
			]
		}
	},

	middleware({ store }) {
		// TODO:
		const crumbs = [{ title: pageTitle, to: '/winterspecial/' }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
