<template>
	<section>
		<h2
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5"
		>
			Wolfweez Winter Special 2024
		</h2>

		<h3 class="mb-2">Das Indoor Wolfweez Feeling für die kälteren Tage</h3>
		<p>
			Ein Abend voller Heavymetal, im Wolfweez OpenAir Festival Style in der
			Waidbachhalle in Irslingen!
		</p>
		<p>
			Mit dabei ist die VOLBEAT Tribute Band -
			<a
				href="https://www.voltbeat.de"
				target="_blank"
				rel="noopener noreferrer"
				><b>VOLTBEAT</b></a
			>!🤩🔥🤘<br />
			+ Support
			<!-- von	<a href="https://www.crekko.de" target="_blank" rel="noopener noreferrer"
				>crekko</a
			>😎🤘 -->
		</p>

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
		<ul>
			<li>Samstag, 07.12.2024</li>
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
			Tickets gibt's auf Eventim und Reservix und Hardtickets ab 5. Juli.
		</v-alert>

		<!-- <v-alert
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-6 mt-0 mt-lg-5 information--text"
		>
			<h3>Der Online Ticket Vorverkauf ist beendet</h3>
			<p>
				Tickets sind bis Freitag, 01.12.2023 noch in den unten genannten VVK
				Stellen erhältlich oder bei Ausschussmitgliedern bis ausverkauft.
				Ansonsten Abendkasse, aber deutlich teurer und auch bis ausverkauft.
			</p>
		</v-alert> -->

		<!-- <v-card color="darkish" flat class="mt-6">
			<v-card-text>
				<v-row align="center" justify="center" no-gutters>
					<v-row>
						<v-col
							v-for="(btn, idx) in buyButtons"
							:key="`btn-${idx}-${btn.buyButtonId}`"
							cols="12"
							lg="6"
							xl="4"
							class="d-flex justify-center ma-n2"
						>
							<ClientOnly>
								<stripe-buy-button
									:buy-button-id="btn.buyButtonId"
									:publishable-key="btn.publishableKey"
								>
								</stripe-buy-button>
							</ClientOnly>
						</v-col>
						<v-col cols="12" lg="6" xl="8">
							<h3 class="mt-1">Jetzt Ticket für nur 28,50 € sichern! *</h3>
							<v-divider class="my-5" />
							<p>
								Hard-Tickets sind ebenfalls in allen offiziellen VVK-Stellen
								erhältlich (Infos folgen), sowie bei Eventim und ReserviX.
							</p>

							<p>
								Und natürlich (sofern nicht ausverkauft) an der Abendkasse (hier
								aber deutlich teurer).
							</p>
							<p class="font-italic" style="opacity: 0.4">
								<small> *inklusive MwSt., Druck- & Logistikgebühren </small>
							</p>
						</v-col>
					</v-row>
				</v-row>
			</v-card-text>
		</v-card> -->

		<!-- <h2 class="mt-10 pb-3">Offizielle Vorverkaufstellen</h2>
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
		</v-row> -->
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Wolfweez Winter Special'

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

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/tickets/tickets'
		})
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
		const crumbs = [{ ...routeMeta.WINTERSPECIAL }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
