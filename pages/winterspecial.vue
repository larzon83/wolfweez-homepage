<template>
	<section>
		<h2
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5"
		>
			Wolfweez Winter Special 2024
		</h2>

		<h3 class="mb-2">Das Indoor Wolfweez Feeling für die kälteren Tage</h3>
		<p>
			Zwei Tage Rock und Metal vom feinsten, hintereinander, in der
			Waidbachhalle in Irslingen!🤩🤘
		</p>
		<v-divider class="my-5" />
		<p>
			Am <b>Freitag den 06. Dezember 2024</b> findet unser alljährlicher
			<nuxt-link :to="bandContestLink"><b>Bandcontest</b></nuxt-link> statt, bei
			dem 5 Nachwuchsbands vor einer Fachjury und euch sich unter Beweis stellen
			werden! Den beiden Gewinnern winken wieder die Opener-Slots beim Wolfweez
			OpenAir Festival zu! Welche 5 Bands an diesem Abend das Finale bestreiten
			werden, geben wir Ende Oktober bekannt!
			<br />
			<br />
			Weitere Infos zum Bandcontest findet ihr
			<nuxt-link :to="bandContestLink">hier</nuxt-link>.
		</p>
		<v-divider class="my-5" />
		<p>
			Am <b>Samstag 07. Dezember 2024</b> öffnen dann die Pforten zur
			Winter-Sepcial-Night! 🤩🤘<br />
			In diesem Jahr mit 2 hochkarätigen Tribute Bands!<br />
			Mit dabei ist die VOLBEAT Tribute Band -
			<a
				href="https://www.facebook.com/PapercutLPTributeBand"
				target="_blank"
				rel="noopener noreferrer"
				><b>Papercut - Linkin Park Tribute Band</b></a
			>
			&
			<a
				href="https://www.facebook.com/PapercutLPTributeBand"
				target="_blank"
				rel="noopener noreferrer"
				><b>Seven-Shots</b></a
			>
			(ehem. VOLTBEAT)!!🤩🤘
		</p>

		<p>
			Nachdem beim letztjährigen Winter-Special, Voltbeat die Halle zum beben
			gebracht hat und wir eine richtig geile Rock ´n Roll Party gefeiert haben,
			haben wir die Jungs noch am selben Abend für das diesjährige
			Winter-Special fix gemacht! Wir freuen uns sehr, dass sie dieses Jahr
			wieder die Waidbachhalle, mit neuem Namen, zum beben bringen werden! 😎🤘
			Wer 2022 auf dem Wolfweez OpenAir Festival zu Gast war, wird sich noch
			sehr Gut an Papercut erinnern können, welche an jenem Abend das Festival
			zum kochen gebracht haben. Wir freuen uns riesig, dass die Jungs aus
			Italien, wieder zu uns nach Irslingen reisen und gemeinsam das Wolfweez
			Winter-Special, mit Seven Shots, zum beben bringen werden!! 🤩😎🤘
		</p>

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
		<ul>
			<li>Freitag, 06.12.2024 und Samstag, 07.12.2024</li>
			<li>Waidbachhalle Irslingen</li>
			<li>Einlass (jeweils): 19 Uhr</li>
			<li>Beginn (jeweils): 20 Uhr</li>
		</ul>
		<br />

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>

		<!-- <v-alert
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-6 mt-0 mt-lg-5 information--text"
		>
			Tickets gibt's auf Eventim und Reservix und Hardtickets ab 5. Juli.
		</v-alert> -->

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

		<LazyWinterspecialBuyButton
			v-if="showWinterspecialBuyButton"
			class="mt-6"
		/>

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
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import { mapState } from 'vuex'
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
			})
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
		buyButtons() {
			// dev
			if (process.env.NUXT_ENV_TEST_MODE === 'true') {
				const publishableKey =
					'pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc'
				return [
					{
						buyButtonId: 'buy_btn_1Q11H1BfAFuG6uOso4ZOt0EZ',
						publishableKey
					}
				]
			}

			// real
			const publishableKey =
				'pk_live_51IP7XYBfAFuG6uOsT6iPXBc5tAIj8xOiOSDprjvToPCV3wrzchcqQe3p8WdZJbBvAYrMAUDaE7dg6GevBgzOwTMd00CXYTn8IM'
			return [
				{
					buyButtonId: 'buy_btn_1Q11N7BfAFuG6uOslxgCZDT7',
					publishableKey
				}
			]
		}
	},

	created() {
		this.bandContestLink = routeMeta.BANDCONTEST.to
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.WINTERSPECIAL }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
