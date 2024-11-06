<template>
	<section v-editable="story.content">
		<SbImage
			v-if="story.content.image_social && story.content.image_social.filename"
			:alt="story.content.headline"
			:pic="story.content.image_social"
			:preset="$config.presetNames.FULL_WIDTH"
			class="mb-8 mb-lg-12"
		/>

		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ story.content.headline }}
		</h1>

		<!-- TODO: put text in SB -->

		<div>
			<!-- ------------------------ -->
			<!-- NOTE: FIRST INFO -->
			<!-- ------------------------ -->
			<!-- <p><b>Termin:</b> 06. Dezember 2024</p>
			<p>Weitere Infos folgen.</p> -->

			<!-- ------------------------ -->
			<!-- NOTE: BEWERBUNG -->
			<!-- ------------------------ -->

			<!-- <p>
				Yeah! Großartige Sache das ihr hier gelandet seid und euch mit euerer
				Band bei unserem Bandcontest bewerbt!!!
			</p>
			<h2>Infos zum Bandcontest</h2>
			<p>
				<b>Termin:</b> 06. Dezember 2024<br />
				<b>Location:</b> Waidbachhalle 78661 Irslingen<br />
				<b>Bewerbungszeitraum:</b> 22.08.2024 – 06.11.2024
			</p>
			<h3>Gewinn</h3>
			<p>
				<b>2x einen Opener-Slot auf dem Wolfweez Open Air Festival 2025.</b>
				<br />
				<i>5 Bands haben die Chance. Jury- und Zuschauervoting.</i>
			</p>
			<br />
			<v-divider />
			<br />

			<h2>Bewerbung</h2>
			<p>Eure Bewerbung sollte folgendes enthalten:</p>
			<ul>
				<li>Bandname</li>
				<li>Musikstil</li>
				<li>Mitglieder (Name / welches Instrument)</li>
				<li>Reisen Rowdi's mit? (Name / verantwortlich für was?)</li>
				<li>Adresse</li>
				<li>Mailadresse oder Telefonnummer für Rückantwort</li>
				<li>Ansprechpartner</li>
				<li>Bewerbungsvideo/Musikvideo oder Hörprobe</li>
				<li>Technical Rider</li>
				<li>Bietet ihr Merchandise an?</li>
				<li>
					Und wir wollen wissen, wieso ihr ausgerechnet bei uns auf dem Festival
					spielen wollt 😉
				</li>
			</ul>
			<br />

			<p>
				<b
					>Schickt uns euere Bewerbung bis zum 15.10.2024 an
					<a href="mailto:bandcontest@wolfweez-openair.de"
						>bandcontest@wolfweez-openair.de</a
					>.</b
				>
			</p>
			<br />
			<v-divider />
			<br />

			<h2>Ablauf</h2>
			<p>Wenn ihr es in die Auswahl geschafft habt:</p>
			<p>
				<b>Was ihr mitbringen müsst:</b> Musikinstrumente / Topteile + Boxen,
				usw... / Setlist für die GEMA / Gästeliste für 5 Personen
			</p>

			<p>
				<b>Was von uns gestellt wird:</b>
				<br />
				Strom / Bühne / PA / Licht / Ton- und Lichttechniker / Drumriser /
				Personal Bühne / Backstagebereich mit Getränken und kleinen Speisen /
				Werbematerial (Flyer + Plakate) / Merchandisestand
			</p>
			<p>
				<b>Was beide Seiten machen:</b>
				<br />
				Werbung via Socialmedia, sowie mit Flyer und Plakate. Wir schicken Euch
				Flyer und Plakate zu.
			</p>
			<p>
				<b>Wann ihr vor Ort sein solltet:</b>
				<br />
				17.00 Uhr. Damit wir vor Ort gemeinsam mit allen Bands die Reihenfolge
				auslosen und noch ein paar Details und Fragen besprechen können.
			</p>
			<p>
				<b>Wie wird bewertet:</b>
				<br />
				Publikum und Jury. Jeder Besucher bekommt 2 Plastikchips als Stimmen,
				welche dann an sein/e Favorit/en vergeben werden kann. Dafür werden
				transparente Kunststoffrohre bei der Bühne aufgestellt (jede Band hat
				ihr eigenes Rohr) in die die Chips eingeworfen werden. Zusätzlich dazu
				haben wir eine neutrale Jury, bestehend aus Musiker und Veranstalter,
				welche verschiedene Kriterien bewerten.<br />
				Das Stimmgewicht liegt wie folgt: Besucherstimme 40% / Jury 60%.
			</p>
			<p>
				<b>Was von der Jury bewertet wird:</b>
				<br />
				Gesamtes Auftreten / Musikalisches Zusammenspiel / Bühnenshow / können
				des Einzelnen am Instrument und Gesang.
			</p>
			<p>
				Solltet ihr noch Fragen haben, welche hier nicht schon beantwortet
				wurden, dann schreibt uns gerne an
				<a href="mailto:bandcontest@wolfweez-openair.de"
					>bandcontest@wolfweez-openair.de</a
				>.
			</p> -->

			<!-- ------------------------ -->
			<!-- NOTE: Bewerbungsphase beendet -->
			<!-- ------------------------ -->

			<!-- <p>
				Die Bewerbungsphase ist beendet. Weitere Infos mit allen teilnehmenden
				Bands folgen.
			</p> -->

			<!-- ------------------------ -->
			<!-- NOTE: BEFORE-SHOW -->
			<!-- ------------------------ -->

			<p>
				Der Bandcontest 2024 steht in den Startlöchern und die fünf Bands für
				das Finale stehen fest!
			</p>
			<p>
				Am <b>06.12.2024</b> ist es wieder so weit, der vierte Bandcontest des
				Wolfweez OpenAir Festivals wird veranstaltet.<br />
				Fünf Bands aus Nah und Fern werden an diesem Abend um die zwei begehrten
				Plätze, vom 2025er Line-Up des Wolfweez OpenAir Festivals auf der Bühne
				gegeneinander antreten und euch ordentlich einheizen.
			</p>

			<ul>
				<li>Der erste Platz bekommt den Opener Slot am Festival-Samstag.</li>
				<li>
					Die zweitplatzierte Band darf das Festival am Festival-Freitag
					eröffnen.
				</li>
			</ul>
			<br />

			<v-divider />
			<br />

			<p>
				Ihr als Zuschauer, habt zusammen mit der Jury, die Aufgabe, diese beiden
				Bands an diesem Abend auszuwählen.
			</p>

			<p>
				Ihr erhaltet am Eingang pro Person 2 Plastikchips, welche jeweils als 1
				Stimme zählen.<br />
				Somit habt ihr zwei Stimmen, die Ihr entweder einer Band gebt oder wenn
				euch zwei sehr gut gefallen haben, auf diese beiden aufteilt.<br />
				Bei der Jury stehen dafür transparente Kunststoffrohre bereit, in welche
				ihr für eure Band, den/die Chips einwerfen könnt.
			</p>

			<p>
				Die Jury, welche an diesem Abend ebenfalls ihre Bewertung macht, hat
				verschiedene Kriterien auf ihrem Zettel.<br />
				So zählen unter anderem: Spielerisches können, gesamt auftreten,
				Bühnenshow, usw. zu den verschiedenen Kriterien, welche die Jury
				bewerten wird.<br />
				Am Ende werden dann die Punktezahlen der Bands ermittelt und noch am
				selben Abend bekannt gegeben, wer die beiden Siegerplätze belegt hat.
			</p>

			<v-divider />
			<br />

			<p>Nach dem Bandcontest startet dann die große Aftershow-Party!</p>

			<p>
				Wir freuen uns auf einen tollen Abend mit großartigen Bands und einer
				anschließenden, ausgelassenen, After-Show-Party!
			</p>

			<p>
				Kommt vorbei, unterstützt die Bands und habt einen tollen Abend bei uns
				in der Waidbachhalle in Irslingen!
			</p>

			<v-divider />
			<br />

			<ul>
				<li>Einlass: 19 Uhr</li>
				<li>Beginn: 20 Uhr</li>
				<li>Eintritt 10€</li>
			</ul>

			<!-- ------------------------ -->
			<!-- NOTE: AFTER-SHOW -->
			<!-- ------------------------ -->

			<!-- <p>
				Der Bandcontest 2024 ist vorbei und die Halle wurde wieder in ihren
				ursprünglichen Zustand versetzt!😁🤘💪
			</p>

			<p>
				Nach einem tollen Bandcontest am Samstag, mit super Bands, die wirklich
				alles auf der Bühne gegeben haben, einem tollen Publikum, und einer sehr
				fachlichen Jury wurden am Abend gleich die beiden Sieger-Bands
				ermittelt. 🥳🤘🍻
			</p>

			<p>Es war bis zum siebten Platz ein Kopf an Kopf rennen!</p>

			<p>
				Vielen Dank an dieser Stelle nochmals an alle Bands die mit dabei
				waren!🤩🤘
			</p>

			<p>
				Das Rennen um die zwei begehrten Plätze
				machten.....*Trommelwirbel*....😁🥁
			</p>

			<p>
				<b>Platz 1: Black and Damned</b><br />
				<b>Platz 2: Concusion</b><br />
				🥳🥳🥳🥳🥳🥳
			</p>

			<p>
				Somit steht auch fest wer am Festival-Freitag und am Festival-Samstag
				die jeweiligen Festivaltage eröffnet!🤩🤘
			</p> -->

			<!-- TODO: obsolete -> remove -->
			<!-- <br />
			<v-divider />
			<br />

			<h2>Sponsorenpaket</h2>
			<br />
			<v-simple-table light dense class="sponsoring-table px-0">
				<template #default>
					<thead>
						<tr>
							<th class="text-left">Paket</th>
							<th class="text-left">Preis</th>
							<th class="text-left">Leistung</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in sponsoringBenefits" :key="item.name">
							<td>
								{{ item.name }}
								<b>{{ item.name }}</b>
							</td>
							<td>{{ item.price }}</td>
							<td>{{ item.benefit }}</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table> -->
		</div>

		<!-- TODO: use for BEFORE-SHOW -->
		<br />
		<v-divider />
		<br />
		<h2>Bands</h2>
		<p>Folgende Bands nehmen am Bandcontest 2024 teil:</p>

		<!-- ------------------------ -->
		<!-- NOTE: SIEGER BANDS -->
		<!-- ------------------------ -->
		<v-row tag="section">
			<v-col
				v-for="band in bands.stories"
				:key="band.content._uid"
				cols="12"
				md="6"
				xl="4"
			>
				<v-card
					v-if="band.content"
					:ripple="false"
					color="darkish"
					flat
					height="100%"
					href
					nuxt
					class="hover-card"
				>
					<v-card-text class="pt-2 pb-4">
						<h2 class="text-body-1 news-title text-center">
							{{ band.content.name }}
						</h2>
					</v-card-text>
					<SbImage
						v-if="band.content.image && band.content.image.filename"
						:alt="band.content.name"
						:pic="band.content.image"
						:preset="$config.presetNames.BAND_OVERVIEW"
						:position="$_shiftImagePositionY(band.content.image_offset)"
					/>
				</v-card>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.BANDCONTEST.title

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
			pageTitle
			// sponsoringBenefits: [
			// 	{
			// 		name: 'Unterstützer',
			// 		price: '50 € - 200 €',
			// 		benefit: 'Aufhängen eines Banners'
			// 	},
			// 	{
			// 		name: 'Premium',
			// 		price: '250 € 400 €',
			// 		benefit: 'Aufhängen Banner + Logo auf Medialeinwand'
			// 	},
			// 	{
			// 		name: 'Haupt',
			// 		price: '450 € - 600 €',
			// 		benefit:
			// 			'Aufhängen Banner + Logo Medialeinwand + Logo auf Flyer u. Plakat'
			// 	}
			// ]
		}
	},

	async asyncData(context) {
		const bandcontest = await sbData({
			ctx: context,
			path: '/bandcontest'
		})

		const bands = await sbData({
			ctx: context,
			startsWith: 'bandcontest-bands/'
		})

		return { ...bandcontest, bands }
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.BANDCONTEST }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/__partials/_hover-card.scss';

.hover-card .news-title {
	line-height: 1.8125rem; // 29px
}

// .v-data-table.sponsoring-table {
// 	tr {
// 		> th:first-of-type,
// 		> td:first-of-type {
// 			padding-left: 0;
// 		}
// 	}
// }
</style>
