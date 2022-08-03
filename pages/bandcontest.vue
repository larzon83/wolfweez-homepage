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
			<p>
				Yeah! Großartige Sache das ihr hier gelandet seid und euch mit euerer
				Band bei unserem Bandcontest bewerbt!!!
			</p>
			<h2>Infos zum Bandcontest</h2>
			<p>
				<b>Termin:</b> 18.November 2022<br />
				<b>Location:</b> Waidbachhalle 78661 Irslingen<br />
				<b>Doors Open:</b> 18.00 Uhr<br />
				<b>Bewerbungszeitraum:</b> 29.07.2022 – 04.09.2022
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
					>Schickt uns euere Bewerbung bis zum 04.09.2022 an
					<a href="mailto:bancontest@wolfweez-openair.de"
						>bancontest@wolfweez-openair.de</a
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
				<a href="mailto:bancontest@wolfweez-openair.de"
					>bancontest@wolfweez-openair.de</a
				>.
			</p>
			<br />
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
			</v-simple-table>
		</div>
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
			pageTitle,
			sponsoringBenefits: [
				{
					name: 'Unterstützer',
					price: '50 € - 200 €',
					benefit: 'Aufhängen eines Banners'
				},
				{
					name: 'Premium',
					price: '250 € 400 €',
					benefit: 'Aufhängen Banner + Logo auf Medialeinwand'
				},
				{
					name: 'Haupt',
					price: '450 € - 600 €',
					benefit:
						'Aufhängen Banner + Logo Medialeinwand + Logo auf Flyer u. Plakat'
				}
			]
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/bandcontest'
		})
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.BANDCONTEST }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
.v-data-table.sponsoring-table {
	tr {
		> th:first-of-type,
		> td:first-of-type {
			padding-left: 0;
		}
	}
}
</style>
