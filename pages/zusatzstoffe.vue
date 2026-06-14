<template>
	<section>
		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4 mb-4"
		>
			{{ pageTitle }} und Allergene
		</h1>

		<h2>Rote</h2>
		<p>
			<i
				>Geschmacksverstärker (enth. Sellerie), Konservierungsstoff
				(Nitritpökelsalz), Phosphat, Antioxidationsmittel</i
			>
		</p>

		<h2 class="mt-8">Wolfs-Pfännle</h2>
		<p>
			<i
				>Lactose (Sahne), Gluten (Weizen), Geschmacksverstärker (enth.
				Sellerie)</i
			>
		</p>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.ZUSATZSTOFFE.title

export default {
	name: 'ZusatzStoffe',
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
		const crumbs = [{ ...routeMeta.ZUSATZSTOFFE }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped></style>
