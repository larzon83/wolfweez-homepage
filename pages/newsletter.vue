<template>
	<div>
		<Breadcrumbs />
		<div id="ckForm" class="mt-4"></div>
	</div>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.NEWSLETTER.title

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
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.NEWSLETTER }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss">
.grecaptcha-badge {
	visibility: hidden;
	opacity: 0;
}
</style>
