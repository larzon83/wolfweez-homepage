<template>
	<section></section>
</template>

<script>
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

export default {
	name: 'Infos',

	head() {
		const title = 'Infos'
		return {
			title,
			meta: createSEOMeta({
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	middleware(context) {
		// TODO: calc this redirect based on first info-item from sb
		context.redirect(301, '/infos/anreise/')
	}
}
</script>
