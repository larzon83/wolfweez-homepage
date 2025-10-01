<template>
	<section>
		<h2
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5"
		>
			Wolfweez Winter Special 2025
		</h2>

		<h3 class="mb-2">Das Indoor Wolfweez Feeling für die kälteren Tage</h3>
		<p>
			Zwei Tage Rock und Metal vom Feinsten, hintereinander, in der
			Waidbachhalle in Irslingen!🤩🤘
		</p>
		<v-divider class="my-5" />
		<p>
			Am <b>Freitag, den 28. November 2025 </b> findet unser alljährlicher
			<nuxt-link :to="bandContestLink"><b>Bandcontest</b></nuxt-link> statt, bei
			dem 5 Nachwuchsbands vor einer Fachjury und euch sich unter Beweis stellen
			werden! Den beiden Gewinnern winken wieder die Opener-Slots beim Wolfweez
			OpenAir Festival zu! Welche 5 Bands an diesem Abend das Finale bestreiten
			werden, geben wir Ende Oktober bekannt! Diesjährige Aftershow-Party mit
			Flashbang!!
			<br />
			<br />
			Weitere Infos zum Bandcontest findet ihr
			<nuxt-link :to="bandContestLink">hier</nuxt-link>.
		</p>
		<v-divider class="my-5" />
		<p>
			Am <b>Samstag, 29. November 2025</b> öffnen dann die Pforten zur
			Winter-Sepcial-Night! 🤩🤘<br />
			In diesem Jahr wieder mit zwei hochkarätigen Tribute Bands!
		</p>
		<p>
			Auch feiern wir hier schon das Winter-Special als WarmUp Party für das
			Wolfweez Festival 2026!<br />
			10 Jahre Wolfweez müssen gebührend gefeiert werden!
		</p>
		<p>
			Mit dabei ist die Limp Bizkit Tribute Band
			<a
				href="https://www.facebook.com/Breakstuffcoverband/"
				target="_blank"
				rel="noopener noreferrer"
				><b>BREAK STUFF</b></a
			>!! 🤩🤘

			<br />
			Nachdem Break Stuff 2019 damals das Wolfweez Festival schon zum Beben
			gebracht haben, haben wir uns dazu entschlossen diese Party dieses Jahr
			bei uns in der Waidbachhalle in Irslingen nochmals zu wiederholen! Wir
			freuen uns sehr, dass sie die die Strecke von Italien (Venedig) nach
			Irslingen wieder auf sich nehmen, um gemeinsam mit uns allen das Jubiläum
			einzuläuten! 😎🤘
		</p>

		<!-- https://www.facebook.com/officialMr.Jack/ -->
		<p>
			In aller Munde sind aktuell System of a Down und da auch wir Fans von SOAD
			sind, haben wir es uns in diesem Jahr nicht nehmen lassen und hier
			ebenfalls eine Tribute Band eingeladen! Ebenfalls reisen aus Italien die
			Jungs von der SOAD Tribute Band
			<a
				href="https://www.facebook.com/officialMr.Jack/"
				target="_blank"
				rel="noopener noreferrer"
				><b>MR. JACK</b></a
			>
			an!
		</p>
		<p>
			Gemeinsam werden Break Stuff und Mr. Jack das Wolfweez Winter-Special zum
			Beben bringen!! 🤩😎🤘
		</p>

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
		<ul>
			<li>Freitag, 28.11.2025 und Samstag, 29.11.2025</li>
			<li>Waidbachhalle Irslingen</li>
			<li>Einlass (jeweils): 18 Uhr</li>
			<li>Beginn (jeweils): 20 Uhr</li>
			<li>Bandcontest (Freitag): 10€ Abendkasse (nur Abendkasse, kein VVK)</li>
			<li>
				Winter-Special (Samstag): 25€ (Abendkasse & VVK, siehe HP zzgl.
				Gebühren)
			</li>
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

		<!-- <LazyWinterspecialBuyButton
			v-if="showWinterspecialBuyButton"
			class="mt-6"
		/> -->

		<LazyLyaWinterspecialButton
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
		...mapState(['showWinterspecialBuyButton'])
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
