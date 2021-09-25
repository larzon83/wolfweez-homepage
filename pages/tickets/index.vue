<template>
	<section v-editable="story.content">
		<v-alert
			v-if="story.content.show_info_box"
			icon="$info"
			dense
			outlined
			prominent
			text
			class="pa-4 mb-10 information--text"
		>
			<rich-text-renderer
				v-if="story.content.info_box"
				:document="story.content.info_box"
			/>
		</v-alert>

		<!-- TODO: put text in festival infos and link from here -->
		<rich-text-renderer
			v-if="story.content.text"
			:document="story.content.text"
		/>

		<h2 class="mt-11">Tickets</h2>
		<v-card color="darkish" flat class="mt-3">
			<!-- TODO: make this a h2 or h3 -->
			<!-- <v-card-title>Tickets</v-card-title> -->
			<!-- FIXME: remove sb Tickets -->
			<!-- <v-card-text
				v-for="ticket in story.content.tickets_list"
				:key="ticket.uuid"
			>
				{{ ticket.name }}
			</v-card-text>

			<v-divider /> -->

			<v-card-text v-if="tickets.length">
				<v-row
					v-for="(ticket, index) in tickets"
					:key="`ticket-${index}`"
					align="center"
					justify="space-between"
				>
					<v-col>{{ ticket.name }}</v-col>
					<v-col cols="auto">SELECT</v-col>
				</v-row>

				<v-row align="center" justify="end">
					<v-col cols="auto">
						<v-btn
							:loading="loading"
							:disabled="loading"
							color="prime"
							role="link"
							class="mt-8"
							@click="checkout"
							>Jetzt kaufen</v-btn
						>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<h2 class="mt-16 pb-3">Offizielle Vorverkaufstellen</h2>
		<v-row>
			<v-col
				v-for="vvk in story.content.vvk_places"
				:key="vvk._uid"
				cols="12"
				md="6"
			>
				<!-- TODO: make this h3 -->
				<b>{{ vvk.name }}</b>
				<br />
				<span v-if="vvk.additional_line">{{ vvk.additional_line }}<br /></span>
				{{ vvk.street }} {{ vvk.street_nr }}<br />
				{{ vvk.plz }} {{ vvk.city }}
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

const pageTitle = routeMeta.TICKETS.title

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
			devProducts: [],
			loading: false
		}
	},

	async asyncData(context) {
		// TODO: directly return
		const foo = await sbData({
			ctx: context,
			path: '/tickets/tickets',
			resolveRelations: 'tickets_list'
		})

		return foo
	},

	computed: {
		tickets() {
			if (this.devProducts.length) return this.devProducts
			return this.$stripeProducts
		}
	},

	async mounted() {
		if (
			process.env.NODE_ENV === 'development' ||
			process.env.NUXT_ENV_IS_SPA === 'true'
		) {
			console.log('loading products...')
			try {
				const products = await this.$axios.$get('/api/stripe-get-products')
				console.log('products:', products)
				this.devProducts = products
			} catch (error) {
				console.log(error)
			}
		}
	},

	methods: {
		async checkout(event) {
			this.loading = true
			// const form = new FormData(event.target)
			const data = [
				{
					// "Kombi-Ticket"
					// sku: form.get('sku'),
					// quantity: Number(form.get('quantity'))
					price: 'price_1IP7gWBfAFuG6uOs4a8hK5zz',
					quantity: 10
				},
				{
					// "Kombi"
					price: 'price_1IP8JQBfAFuG6uOsWHH4Xck2',
					quantity: 1
				}
			]

			try {
				const response = await this.$axios.$post('/api/stripe-checkout', data, {
					headers: { 'Content-Type': 'application/json' }
				})

				console.log('response:', response)

				window.location.href = response.sessionUrl
			} catch (error) {
				console.log(error)
				this.loading = false
			}
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.TICKETS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
.v-alert ::v-deep p:last-child {
	margin: 0;
}
</style>
