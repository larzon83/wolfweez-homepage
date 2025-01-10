<template>
	<section v-editable="story.content">
		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ story.content.headline }}
		</h1>

		<p>
			Mich kann man mieten!<br />
			Im Programm haben wir einen Klowagen, sowie einen Klocontainer und
			Hartplastikbecher in zwei Größen.
		</p>

		<v-divider class="my-5" />

		<h2 class="mb-2">Klowagen</h2>
		<p>
			DU suchst für dein Event noch einen passenden, schicken und modernen
			Klowagen oder Klocontainer? Dann bis du bei uns genau richtig! Für einen
			schmalen Taler kann dieser Klowagen oder Klocontainer auf deinem Event für
			das passende Ambiente im Bereich Sanitär sorgen. Die neu aufgebauten und
			modernisierten Sanitäreinrichtungen passen zu jedem Event. Egal ob
			Hochzeit, runde Geburtstage, Betriebs- oder Vereinsfeiern! Nur eines
			gleich vorweg: Für Dorffeste o.ä. Veranstaltungen werden diese nicht
			vermietet. Tut uns leid.
		</p>
		<p>
			Eure Anfragen zum Mietpreis und Mietzeitraum, könnt ihr gerne an
			<a href="mailto:mieten@wolfweez-openair.de">mieten@wolfweez-openair.de</a>
			schicken.
		</p>
		<p>
			Bitte mit angeben: <br />
			Mieter, Mietzeitraum, Art der Veranstaltung, Ort der Veranstaltung.
		</p>

		<h4>Technische Daten/Einrichtung</h4>
		Klowagen komplett neu hergerichtet, mit 1 Herren WC, 2 Pissoir und 1
		Waschbecken, sowie 2 Damen WC's und einem Waschbecken. Ablauf via KG Rohr.
		Zuleitung via GK-Kupplung. Lichtstrom 230V für Beleuchtung LED.
		Einachsanhänger für Zugmaul, Beleuchtung 7 Poliger Stecker, 25 km/h Schild.

		<LightGalleries
			v-if="galleries['mieten-gallery-klowagen']"
			:id="galleries['mieten-gallery-klowagen'].id"
			:galleries="galleries['mieten-gallery-klowagen'].galleries"
			gallery-title="Wolfweez Klowagen mieten"
			hide-headline
			class="mt-8 mb-8"
		/>

		<v-divider class="my-5" />

		<h2 class="mb-2">Becher</h2>
		<p>Oder du benötigst für dein Event Becher? Auch hier haben wir was!</p>
		<p>
			Es gibt 2 Größen, einmal die Großen in 0,4L und einmal die Kleinen in
			0,2L.
		</p>
		<p>Preis auf Anfrage!</p>

		<LightGalleries
			v-if="galleries['mieten-gallery-becher']"
			:id="galleries['mieten-gallery-becher'].id"
			:galleries="galleries['mieten-gallery-becher'].galleries"
			gallery-title="Wolfweez Becher mieten"
			hide-headline
			class="mt-8 mb-8"
		/>

		<v-divider class="my-5" />

		<h2 class="mb-2">WC-Container</h2>
		<p>
			<i>Im Umbau. Info's und Bilder folgen.</i>
		</p>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.MIETEN.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = this.story.content.headline

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
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/mieten2'
		})
	},

	computed: {
		galleries() {
			const mietenAllGalleries = this.story.content.galleries

			if (!mietenAllGalleries.length) {
				return []
			}

			// TODO: create "mieten" Block inside SB which has text and gallery
			return mietenAllGalleries.reduce((acc, currGallery) => {
				acc[currGallery.id] = {
					id: currGallery.id,
					galleries: [
						{
							imgs: currGallery.images
						}
					]
				}

				return acc
			}, {})
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.MIETEN }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped></style>
