<template>
	<section>
		<TabsNavigation :type="tabType" />
		<v-row fill-height>
			<v-col
				v-for="band in bandsAll"
				:key="band.content._uid"
				cols="12"
				md="6"
				lg="4"
			>
				<v-card
					v-if="band.content"
					color="#212322"
					href
					nuxt
					height="100%"
					:ripple="false"
					:to="$_slashify(band.full_slug)"
				>
					<v-img
						v-if="band.content.image.filename"
						:alt="band.content.name"
						:src="band.content.image.filename"
						:lazy-src="$_transformImage(band.content.image.filename, '300x0')"
						aspect-ratio="1.9048"
						eager
						class="py-3"
						position="top center"
						contain
					></v-img>
					<v-card-title class="text-h4 text-md-h6 text-xl-h5">
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
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { tabTypes } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'BandsOverview',
	mixins: [useFormatting, useStorybridge],

	head() {
		const title = 'Bands'
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
	}
}
</script>
