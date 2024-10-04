<template>
	<section>
		<h2
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5"
		>
			Wolfweez Rookie Day 2025
		</h2>

		<h3 class="mb-2">Ein Tag für unser jüngstes Publikum!</h3>
		<p>
			Die Dinos zu Gast! 🦖🤩🤘<br />
			<a
				href="https://www.facebook.com/HeavysaurusDE"
				target="_blank"
				rel="noopener noreferrer"
				><b>Heavysaurus</b></a
			>
			wollen zusammen mit Euch die Waidbachhalle in Irslingen rocken!<br />
			Die Dinos machen am 05. APRIL 2025 Halt bei uns in Irslingen und
			präsentieren Euch die "Pommesgabel Tour 2025" mit neuen Hits von Ihrem
			gleichnamigen Album "Pommesgabel Reloded", sowie weiteren Klassikern von
			Ihren bisherigen Alben! 🤩🤘
			<br />
			Das wird eine riesen Dino-Party!! 🦖🥳🤘
		</p>

		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
		<ul>
			<li>Samstag, 05.04.2025</li>
			<li>Waidbachhalle Irslingen</li>
			<li>Einlass: 15 Uhr</li>
			<li>Beginn: 16 Uhr</li>
		</ul>
		<br />
		<p>🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>

		<LazyRookieDayBuyButton v-if="showRookieDayBuyButton" class="mt-6" />

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

		<v-divider class="my-5" />

		<p>
			Schon lange wollten wir HeavySaurus für unsere jüngsten Besucher zum
			<nuxt-link to="/"><b>Wolfweez "Open Air" Festival</b></nuxt-link> holen,
			doch dies war bisher leider zeitlich nicht möglich. Doch nun haben wir die
			passende Lösung gefunden und können Euch einen ganzen Mittag, mit der
			ganzen Familie, voller Dino-Metal und jeder Menge Spaß präsentieren!
			🦖🥳🤩🤘
		</p>

		<h3 class="mb-2">Die „POMMESGABEL TOUR“ geht weiter</h3>

		<p>
			Seit Anfang des Jahres 2024 sind Riffi Raffi (Gitarre), Muffi Puffi
			(Bass), Komppi Momppi (Drums), Milli Pilli (Keyboards) und natürlich
			Sänger Mr. Heavysaurus bereits auf Tour, bis Ende des Jahres werden sie
			über 180 Shows im deutschsprachigen Raum gespielt haben.
			<br />
			Und die Reaktionen sind grandios: Ausverkaufte Hallen, strahlende
			Kindergesichter, lachende Eltern und unzählige in die Höhe gereckte Hände
			mit „Pommesgabeln“, dem internationalen Erkennungszeichen für Metalheads.
			<br />
			Weil alle – ob Mensch, Dino oder Drache – so viel Spaß dabei haben, wird
			die „POMMESGABEL TOUR“ verlängert: Gleich im Januar 2025 geht es weiter
			für HEAVYSAURUS (und die fünf Profimusiker, die in den coolen
			Dino-Kostümen stecken und live spielen). Die 3- bis 11-Jährigen und ihre
			Begleiter jeden Alters können sich auf ein einzigartiges Konzerterlebnis
			freuen: Eine Band mit richtigen Instrumenten auf großer Bühne, mit
			Lichtspektakel, Nebel, Funkenregen, Luftballons und Konfetti. Und
			natürlich mit den Songs, die viele Kinder (und Eltern) jetzt schon
			mitsingen können, wie „Kaugummi ist mega!“ oder „Rarrr“, der von vielen
			lachenden Mündern gerne laut mitgerufene Schrei der Dinos.
			<br />
			Dabei können die jungen Fans auch 2025 ihre grüngeschuppten Lieblinge
			persönlich treffen. Denn es wird limitierte VIP-Ticket-Kontingente geben,
			die es den kleinen größten Fans möglich machen, die Dinos kennenzulernen,
			ihnen die Tatzen zu schütteln und Fotos zu machen.
			<br />
			Daneben sind Heavysaurus weiter offizielle Botschafter von 'Die Arche',
			einer deutschlandweit tätigen Organisation, die sich für benachteiligte
			Kinder und ihre Familien einsetzt. Deshalb spendet die Band von jedem
			verkauften Ticket gerne 1 Euro an "Die Arche".
			<br />
			Für die Eltern: Die Konzerte finden an Nachmittagen und mit angepasster
			Lautstärke statt. Wo immer möglich, gibt es vor der Bühne einen eigenen
			Kinderbereich mit bester Sicht auch für die Kleinen. Und keine Sorge: Die
			Dinos beißen nicht.
		</p>

		<p>
			Tickets, Meet & Greets, Bundles und vieles mehr exklusiv auf
			<a
				href="https://heavysaurus.store/"
				target="_blank"
				rel="noopener noreferrer"
				><b>www.heavysaurus.store</b></a
			><br />
			Alle Videos und Hintergrundgeschichten finden sich auf
			<a
				href="https://www.heavysaurus.de/"
				target="_blank"
				rel="noopener noreferrer"
				><b>www.heavysaurus.de</b></a
			>
		</p>
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

const pageTitle = 'Wolfweez Rookie Day 2025'

export default {
	name: 'WolfweezRookieDay',
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
		...mapState(['showRookieDayBuyButton'])
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.ROOKIE__DAY }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
