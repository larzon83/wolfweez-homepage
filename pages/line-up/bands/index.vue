<template>
	<section>
		<TabsNavigation :type="tabType" />
		<Breadcrumbs />
		<v-row class="my-0">
			<v-col
				v-for="band in bandsAll"
				:key="band.content._uid"
				cols="12"
				md="6"
				lg="4"
			>
				<v-card
					v-if="band.content"
					:ripple="false"
					:to="$_slashify(band.full_slug)"
					color="darkish"
					flat
					height="100%"
					href
					nuxt
				>
					<v-img
						v-if="band.content.image.filename"
						:alt="band.content.name"
						:src="band.content.image.filename"
						:lazy-src="$_transformImage(band.content.image.filename, '300x0')"
						aspect-ratio="1.9048"
						eager
					></v-img>
					<!-- TODO: use different sizes per breakpoint: text-h4 text-md-h6 text-xl-h5 -->
					<v-card-title>
						{{ band.content.name }}
					</v-card-title>
					<v-card-text>
						<rich-text-renderer
							v-if="band.content.description_short"
							:document="band.content.description_short"
						/>
					</v-card-text>
				</v-card>
				<p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
					This content loads on save. <strong>Save the entry & reload.</strong>
				</p>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta, tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.LINEUP__BANDS.title

export default {
	name: 'BandsOverview',
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				description: this.metaDescription,
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			pageTitle,
			tabType: tabTypes.LINEUP
		}
	},

	async asyncData(context) {
		const bandsDir = await sbData({
			ctx: context,
			startsWith: 'line-up/bands/'
		})

		const bandsMeta = bandsDir.stories.filter(item => {
			return item.is_startpage
		})

		const bandsAll = bandsDir.stories.filter(item => {
			return !item.is_startpage
		})

		return {
			bandsAll,
			metaDescription: bandsMeta[0].content.description_meta
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.LINEUP }, { ...routeMeta.LINEUP__BANDS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
