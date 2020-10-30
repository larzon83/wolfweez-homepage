<template>
	<section></section>
</template>

<script>
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'LineUp',

	head() {
		const title = 'Line-Up'
		return {
			title,
			meta: createSEOMeta({
				// description: '', // TODO:
				title,
				url: this.$route.path
			})
		}
	},

	middleware(context) {
		context.redirect(301, '/line-up/bands/')
	}
}
</script>
