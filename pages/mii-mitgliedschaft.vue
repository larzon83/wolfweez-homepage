<template>
	<section>
		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ pageTitle }}
		</h1>

		<v-row align="center" class="pt-16 flex-column flex-md-row">
			<v-col cols="auto">
				<v-img
					alt="Logo Musikinitiative Irslingen 2019 e.V."
					:aspect-ratio="945 / 990"
					:src="require('~/assets/img/mii-logo.svg')"
					contain
					width="120"
				/>
			</v-col>
			<v-col class="text-center text-md-left">
				<h2>Musikinitiative Irslingen 2019 e.V.</h2>
				<p class="mb-1">
					<a href="/mii-mitgliedsantrag-2023.pdf" target="_blank"
						>Hier geht's zur Mitgliedschaft<v-icon
							size="15"
							class="ml-2 ahref--text"
							>$externalLink</v-icon
						></a
					>
				</p>
				<p>
					<a href="/mii-satzung.pdf" target="_blank"
						>Satzung der M.I.I.<v-icon size="15" class="ml-2 ahref--text"
							>$externalLink</v-icon
						></a
					>
				</p>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.MII_MITGLIEDSCHAFT.title

export default {
	name: 'MiiMitgliedschaft',
	mixins: [savePagetitleToVuex],

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

	data() {
		return {
			pageTitle
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.MII_MITGLIEDSCHAFT }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped></style>
