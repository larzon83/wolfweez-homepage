<template>
	<section>
		<h1 class="d-none d-lg-flex text-h3 text-md-h2 font-weight-bold">
			{{ pageTitle }}
		</h1>

		<!-- MAIN sponsors -->
		<v-card color="darkish" flat class="mt-0 mt-lg-5 pb-4">
			<!-- TODO: make this a h2 or h3 -->
			<v-card-title>{{ mainSponsors.story.content.title }}</v-card-title>
			<v-card-text>
				<v-row
					v-for="(sponsor, index) in mainSponsors.story.content.sponsors_list"
					:key="`main-sponsor-${sponsor._uid}`"
					v-editable="sponsor"
					class="mb-0 flex-column flex-md-row"
					:class="[index === 0 ? 'mt-0' : 'mt-6']"
					no-gutters
				>
					<v-col cols="12" md="3" class="pt-md-3">
						<SponsorItem
							:sponsor="sponsor"
							:preset="$config.presetNames.SPONSORS_MAIN"
						/>
					</v-col>
					<v-col cols="12" md="8" offset-md="1">
						<h3 class="pb-1 mt-10 mt-md-0">{{ sponsor.name }}</h3>
						<rich-text-renderer :document="sponsor.description" />
						<p v-if="sponsor.link">
							<a :href="sponsor.link" rel="noreferrer" target="_blank">{{
								sponsor.link
							}}</a>
						</p>
						<v-divider
							v-if="
								index !== mainSponsors.story.content.sponsors_list.length - 1
							"
							class="mt-13"
						/>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<!-- NORMAL sponsors -->
		<!-- TODO: make this a h2 or h3 -->
		<h2 class="mt-16">{{ story.content.title }}</h2>
		<v-row class="mt-3 mb-0">
			<v-col
				v-for="sponsor in story.content.sponsors_list"
				:key="`normal-sponsor-${sponsor._uid}`"
				v-editable="sponsor"
				cols="6"
				lg="4"
			>
				<v-card color="darkish" flat>
					<v-card-text class="pa-3 pa-md-5 pa-lg-3 pa-xl-5">
						<SponsorItem
							:sponsor="sponsor"
							:preset="$config.presetNames.SPONSORS_NORMAL"
						/>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.SPONSOREN.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.mainSponsors.story.content.image_social?.filename,
			this.$route.path
		)

		const linkEntries = []
		const preloadImage = this.$_getPreloadImageHeadEntry(
			this.mainSponsors.story.content.sponsors_list[0].logo?.filename,
			this.$config.presetNames.SPONSORS_MAIN
		)
		if (preloadImage) linkEntries.push(preloadImage)

		return {
			title,
			meta: createSEOMeta({
				image,
				imageAlt: title,
				imageHeight,
				title,
				url: this.$route.path
			}),
			link: [...linkEntries]
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
			path: '/sponsoren/normal',
			isStartpage: 0
		})
	},

	computed: {
		...mapState(['mainSponsors'])
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.SPONSOREN }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
