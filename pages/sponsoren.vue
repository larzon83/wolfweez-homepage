<template>
	<section>
		<Breadcrumbs />
		<h1>{{ pageTitle }}</h1>
		<v-row class="mt-3 mb-0">
			<v-col
				v-for="(sponsor, sponsorIndex) in normalSponsors.stories"
				:key="`sponsor-${sponsorIndex}`"
				cols="4"
			>
				<a
					v-if="sponsor.content.link"
					:href="sponsor.content.link"
					rel="noreferrer"
					target="_blank"
					class="d-block"
				>
					<BaseImage
						:alt="sponsor.name"
						:pic="sponsor.content.logo"
						max-width="auto"
						width="300"
					/>
				</a>
				<BaseImage
					v-else
					:alt="sponsor.name"
					:pic="sponsor.content.logo"
					max-width="auto"
					width="300"
				/>
			</v-col>
		</v-row>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.SPONSOREN.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting],

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
			link: [
				{ rel: 'preconnect', href: 'https://a.storyblok.com' },
				{ rel: 'preconnect', href: 'https://img2.storyblok.com' }
			]
		}
	},

	data() {
		return {
			pageTitle
		}
	},

	async asyncData(context) {
		const normalSponsors = await sbData({
			ctx: context,
			startsWith: 'sponsoren/normal/',
			isStartpage: 0
		})

		return { normalSponsors }
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.SPONSOREN }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
