<template>
	<a
		v-if="sponsor.link"
		:href="sponsor.link"
		rel="noreferrer"
		target="_blank"
		class="d-block mb-5 mb-md-0"
	>
		<SbImage
			:alt="sponsor.name"
			:exact-height="exactHeight"
			:pic="sponsor.logo"
			:preset="preset"
		/>
	</a>
	<SbImage
		v-else
		:alt="sponsor.name"
		:exact-height="exactHeight"
		:pic="sponsor.logo"
		:preset="preset"
	/>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import { presetNames } from '~/utils/responsive-images'

export default {
	name: 'SponsorItem',
	mixins: [useFormatting],
	props: {
		preset: {
			type: String,
			required: true
		},
		sponsor: {
			type: Object,
			required: true
		}
	},

	computed: {
		exactHeight() {
			let height

			if (this.preset === presetNames.SPONSORS_MAIN_FOOTER) {
				height = this.sponsor.logo_height || '35'
			}

			return height
		}
	}
}
</script>
