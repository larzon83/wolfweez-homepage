<template>
	<div class="mt-4">
		<script
			async
			data-uid="ff9c7b47c6"
			src="https://cheerful-motivator-7522.ck.page/ff9c7b47c6/index.js"
		></script>
	</div>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = 'Newsletter'

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				description: 'Jetzt zum Newsletter anmelden', // TODO:
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			pageTitle
		}
	}
}
</script>

<style lang="scss">
.grecaptcha-badge {
	visibility: hidden;
	opacity: 0;
}
</style>
