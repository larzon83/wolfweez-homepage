<template>
	<WrapWithLink :href="sponsor.link" class="d-block" :class="wrapperClass">
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
		this.wrapperClass =
			this.preset === presetNames.SPONSORS_MAIN_FOOTER ? 'mb-5 mb-md-0' : ''
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
