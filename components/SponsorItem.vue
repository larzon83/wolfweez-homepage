<template>
	<WrapWithLink :href="sponsor.link" :css-class="`d-block ${wrapperClass}`">
		<SbImage
			:alt="sponsor.name"
			:exact-height="sbExtras.exactHeight"
			:pic="sponsor.logo"
			:preset="preset"
			:margin-top="sbExtras.marginTop"
		/>
	</WrapWithLink>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

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
		this.sbExtras = this.getSbExtras()
		this.wrapperClass =
			this.preset === this.$config.presetNames.SPONSORS_MAIN_FOOTER
				? 'mb-5 mb-md-0'
				: ''
	},

	methods: {
		getSbExtras() {
			let exactHeight
			let marginTop

			if (this.preset === this.$config.presetNames.SPONSORS_MAIN_FOOTER) {
				exactHeight = this.sponsor.logo_height || '35'
				marginTop = this.sponsor.logo_margin_top
			}

			return { exactHeight, marginTop }
		}
	}
}
</script>
