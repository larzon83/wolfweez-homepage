<template>
	<!-- IN-ACTIVE -->
	<section v-if="!pageIsActive">
		<h2 class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold">
			Tickets
		</h2>

		<v-alert
			v-if="story.content.show_info_box"
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-10 mt-0 mt-lg-5 information--text"
		>
			<rich-text-renderer
				v-if="story.content.info_box"
				:document="story.content.info_box"
			/>
		</v-alert>

		<div v-if="story.content.show_page_inactive_box" class="mt-8">
			<rich-text-renderer
				v-if="story.content.text_page_inactive"
				:document="story.content.text_page_inactive"
			/>
		</div>

		<!-- NOTE: duplicated this from below; lazy... :) -->
		<!-- TODO: sb -->
		<template v-if="false">
			<h2 class="mt-16 pb-3">Offizielle Vorverkaufstellen</h2>
			<v-row>
				<template v-for="vvk in story.content.vvk_places">
					<v-col v-if="!vvk.disabled" :key="vvk._uid" cols="12" md="6">
						<!-- TODO: make this h3 -->
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
		</template>
	</section>

	<!-- TODO: Finde passende Unterkünfte in Irslingen und Umgebung -->
	<!-- TODO: remove modules/stripeProducts/plugin.js -->

	<!-- ACTIVE -->
	<section
		v-else-if="
			showLyaBuyButton || showWinterspecialBuyButton || showRookieDayBuyButton
		"
		class="buy-buttons"
	>
		<LazyLyaBuyButton v-if="showLyaBuyButton">
			<h2 class="text-h4 font-weight-bold mb-4">
				Tickets Wolfweez OpenAir Festival 2025
			</h2>
		</LazyLyaBuyButton>

		<a
			href="https://infield.live/festivals/wolfweez-open-air-festival/?booking=true"
			rel="noreferrer"
			target="_blank"
			class="buy-buttons d-block"
		>
			<SbImage
				alt="infield festival weeks"
				:pic="{
					filename:
						'https://a.storyblok.com/f/95378/1920x520/700d985e2f/infield-banner-2025.png?cv=1740830236346'
				}"
				:preset="$config.presetNames.FULL_WIDTH"
		/></a>

		<LazyWinterspecialBuyButton v-if="showWinterspecialBuyButton">
			<h2 class="text-h4 font-weight-bold mb-4">
				Tickets Wolfweez Winter Special 2024
			</h2>
			<p>
				Weitere Infos zum Winter Special findet ihr
				<nuxt-link :to="winterSpecialLink">hier</nuxt-link>.
			</p>
		</LazyWinterspecialBuyButton>

		<LazyRookieDayBuyButton v-if="showRookieDayBuyButton">
			<h2 :class="['text-h4 font-weight-bold mb-4']">
				Tickets Wolfweez Rookie Day 2025
			</h2>
			<p>
				Weitere Infos zum Rookie Day findet ihr
				<nuxt-link :to="rookieDayLink">hier</nuxt-link>.
			</p>
		</LazyRookieDayBuyButton>

		<div>
			<h2 class="pb-3">Offizielle Vorverkaufstellen</h2>
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
		</div>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import { mapState } from 'vuex'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.TICKETS.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	// IN-ACTIVE
	// head() {
	// 	const title = pageTitle
	// 	return {
	// 		title,
	// 		meta: createSEOMeta({
	// 			image: createOgImagePath(this.$route.path),
	// 			imageAlt: title,
	// 			title,
	// 			url: this.$route.path
	// 		})
	// 	}
	// },

	// ACTIVE
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
			// pageIsActive:
			// 	process.env.NODE_ENV === 'development' ||
			// 	process.env.NUXT_ENV_IS_SPA === 'true' ||
			// 	process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true',
			pageIsActive: false,
			pageTitle
		}
	},

	async asyncData(context) {
		return await sbData({
			ctx: context,
			path: '/tickets/tickets'
		})
	},

	computed: {
		...mapState([
			'showLyaBuyButton',
			'showWinterspecialBuyButton',
			'showRookieDayBuyButton'
		])
	},

	created() {
		this.winterSpecialLink = routeMeta.WINTERSPECIAL.to
		this.rookieDayLink = routeMeta.ROOKIE__DAY.to
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.TICKETS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
@media #{map-get($display-breakpoints, 'sm-and-down')} {
	.ticket-box {
		border-radius: 0;
	}

	.ticket-img {
		width: 115px;
	}
}

.v-chip:hover:before,
.v-chip:before {
	opacity: 0.06;
}

.price-wrapper {
	gap: 8px;
}

.desc,
.vvk {
	color: getcolor('bright', 0.8);
}

.vvk {
	line-height: normal;
}

.shipping-amount {
	color: getcolor('bright', 0.45);
}

.btn-buy {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;

	@media (max-width: 783px) {
		display: flex;
		flex: 1 0 auto;
		min-width: 100% !important;
	}
}

.v-alert {
	::v-deep p:last-child {
		margin: 0;
	}

	a {
		color: currentColor;
	}
}

.v-text-field {
	width: 40px;
	max-width: 40px;

	::v-deep input[type='number'] {
		appearance: none;
		-moz-appearance: textfield;
		text-align: center;
		margin: 0;

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			appearance: none;
			-moz-appearance: none;
			-webkit-appearance: none;
			margin: 0;
		}
	}
}

.buy-buttons {
	& > * + * {
		margin-top: 48px;
	}
}
</style>
