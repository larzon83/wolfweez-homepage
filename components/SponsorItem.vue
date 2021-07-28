<template>
	<WrapWithLink :href="sponsor.link">
		<SbImage
			:alt="sponsor.name"
			:exact-height="exactHeight"
			:pic="sponsor.logo"
			:preset="preset"
		/>
	</WrapWithLink>
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

	created() {
		this.exactHeight = this.getExactHeight()
	},

	methods: {
		getExactHeight() {
			let height

			if (this.preset === presetNames.SPONSORS_MAIN_FOOTER) {
				height = this.sponsor.logo_height || '35'
			}

			return height
		}
	}
}
</script>
