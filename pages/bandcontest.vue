<template>
	<section>
		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ pageTitle }}
		</h1>
		<div>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
			velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
			cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
			est laborum.
			<br />
			<br />
			<hr />
			<br />
			<a href="mailto:info@wolfweez-openair.de">info@wolfweez-openair.de</a>
		</div>
	</section>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.BANDCONTEST.title

export default {
	name: pageTitle,
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				imageAlt: title,
				title,
				url: this.$route.path,
				// FIXME: delete
				noindex: true
			})
		}
	},

	data() {
		return {
			pageTitle
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.BANDCONTEST }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>
