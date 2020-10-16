<template>
	<section>
		<BandDetail :band="story.content" />
	</section>
</template>

<script>
import BandDetail from '~/components/BandDetail.vue'
import { sbData } from '~/utils'

export default {
	components: {
		BandDetail
	},

	data() {
		return {
			story: { content: {} }
		}
	},

	asyncData(context) {
		// return context.app.$storyapi
		// 	.get(`cdn/stories/bands/${context.params.slug}`, {
		// 		// version: sbVersion(context)
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

		return sbData({
			ctx: context,
			path: `/bands/${context.params.slug}`
		})
	},

	mounted() {
		// Use the input event for instant update of content
		this.$storybridge.on('input', event => {
			if (event.story.id === this.story.id) {
				this.story.content = event.story.content
			}
		})

		// Use the bridge to listen the events
		this.$storybridge.on(['published', 'change'], event => {
			// window.location.reload()
			this.$nuxt.$router.go({
				path: this.$nuxt.$router.currentRoute,
				force: true
			})
		})
	}
}
</script>
