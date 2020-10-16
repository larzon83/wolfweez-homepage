<template>
	<section>
		<h2 class="py-10 text-center font-bold text-4xl">Alle Bands</h2>
		<ul class="flex py-6 mb-6">
			<li
				v-for="band in stories"
				:key="band.content._uid"
				class="flex-auto px-6"
				style="min-width: 33%"
			>
				<nuxt-link
					v-if="band.content"
					:to="`/${band.full_slug}`"
					class="article-teaser block py-4 px-6 border rounded border-gray-500"
				>
					<h2 class="pt-2 pb-4 text-2xl font-bold">
						{{ band.content.name }}
					</h2>
					<p class="pb-6 leading-relaxed">
						{{ band.content.description }}
					</p>
				</nuxt-link>
				<p v-else class="px-4 py-2 text-white bg-red-700 text-center rounded">
					This content loads on save. <strong>Save the entry & reload.</strong>
				</p>
			</li>
		</ul>
	</section>
</template>

<script>
import { sbData } from '~/utils'

export default {
	data() {
		return {
			stories: []
		}
	},
	asyncData(context) {
		return sbData({
			ctx: context,
			startsWith: 'bands/'
		})

		// return context.app.$storyapi
		// 	.get('cdn/stories', {
		// 		starts_with: 'articles/',
		// 		version: 'draft'
		// 	})
		// 	.then(res => {
		// 		return res.data
		// 	})
		// 	.catch(res => {
		// 		if (!res.response) {
		// 			console.error(res)
		// 			context.error({
		// 				statusCode: 404,
		// 				message: 'Failed to receive content form api'
		// 			})
		// 		} else {
		// 			console.error(res.response.data)
		// 			context.error({
		// 				statusCode: res.response.status,
		// 				message: res.response.data
		// 			})
		// 		}
		// 	})
	}
}
</script>
