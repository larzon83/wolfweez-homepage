<template>
	<section>
		<h2 class="text-h4 text-sm-h3 text-lg-h2 font-weight-bold mb-5">
			Wolfweez Winterspecial
		</h2>

		<h3 class="mb-2">Mit Voltbeat</h3>
		<ul>
			<li>Samstag, 02.12.2023</li>
			<li>Waidbachhalle Irslingen</li>
		</ul>

		<v-row class="mt-2">
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
		</v-row>
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
