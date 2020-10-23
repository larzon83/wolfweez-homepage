<template>
	<section>
		<ul class="flex py-6 mb-6">
			<li
				v-for="news in stories"
				:key="news.content._uid"
				class="flex-auto px-6"
				style="min-width: 33%"
			>
				<nuxt-link
					v-if="news.content"
					:to="`/${news.full_slug}`"
					class="article-teaser block py-4 px-6 border rounded border-gray-500"
				>
					<h2 class="pt-2 pb-4 text-2xl font-bold">
						{{ news.content.headline }}
					</h2>
					<h5>{{ $_niceDate(news.created_at) }}</h5>
					<rich-text-renderer
						v-if="news.content.description_short"
						:document="news.content.description_short"
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

export default {
	name: 'NewsOverview',
	mixins: [useFormatting, useStorybridge],

	head() {
		return {
			title: 'News',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'description description description' // TODO:
				}
			]
		}
	},

	async asyncData(context) {
		// expands to -> stories: []
		return await sbData({
			ctx: context,
			startsWith: 'news/',
			sortBy: 'created_at:desc'
		})
	}
}
</script>