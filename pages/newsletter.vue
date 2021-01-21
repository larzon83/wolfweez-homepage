<template>
	<div id="ckForm" class="mt-4">
		<!-- <client-only>
			<script
				async
				data-uid="ff9c7b47c6"
				src="https://cheerful-motivator-7522.ck.page/ff9c7b47c6/index.js"
			></script>
		</client-only> -->
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
			// script: [
			// 	{
			// 		src: 'https://cheerful-motivator-7522.ck.page/ff9c7b47c6/index.js',
			// 		'data-uid': 'ff9c7b47c6',
			// 		async: true,
			// 		body: true
			// 		// type: 'text/javascript',
			// 	}
			// ]
		}
	},

	data() {
		return {
			pageTitle
		}
	},

	mounted() {
		const ckEmbed = document.createElement('script')
		const ckForm = document.getElementById('ckForm')
		ckEmbed.setAttribute(
			'src',
			'https://cheerful-motivator-7522.ck.page/ff9c7b47c6/index.js'
		)
		ckEmbed.setAttribute('data-uid', 'ff9c7b47c6')
		ckEmbed.async = true
		ckForm.appendChild(ckEmbed)
	}
}
</script>

<style lang="scss">
.grecaptcha-badge {
	visibility: hidden;
	opacity: 0;
}
</style>
