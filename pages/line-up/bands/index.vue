<template>
	<section>
		<TabsLineup />
		<ul class="flex py-6 mb-6">
			<li
				v-for="band in stories"
				:key="band.content._uid"
				class="flex-auto px-6"
				style="min-width: 33%"
			>
				<nuxt-link
					v-if="band.content"
					:to="$_slashify(band.full_slug)"
					class="article-teaser block py-4 px-6 border rounded border-gray-500"
				>
					<h2 class="pt-2 pb-4 text-2xl font-bold">
						{{ band.content.name }}
					</h2>
					<rich-text-renderer
						v-if="band.content.description_short"
						:document="band.content.description_short"
					/>
				</nuxt-link>
				<p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
					This content loads on save. <strong>Save the entry & reload.</strong>
				</p>
			</li>
		</ul>
	</section>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import useStorybridge from '~/mixins/useStorybridge.js'
import { sbData } from '~/utils'
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'BandsOverview',
	mixins: [useFormatting, useStorybridge],

	head() {
		const title = 'Bands'
		return {
			title,
			meta: createSEOMeta({
				// description: '', // TODO:
				title,
				url: this.$route.path
			})
		}
	},

	async asyncData(context) {
		// expands to -> stories: []
		return await sbData({
			ctx: context,
			startsWith: 'line-up/bands/'
		})
	}
}
</script>
