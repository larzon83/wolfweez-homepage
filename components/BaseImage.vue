<template>
	<v-img
		v-if="pic.filename"
		:alt="pic.alt"
		:src="$_transformImage(pic.filename, `${width}x0`)"
		:lazy-src="
			$_transformImage(
				pic.filename,
				`${Math.ceil(4 * $_aspectRatio(pic.filename))}x0`
			)
		"
		:aspect-ratio="$_aspectRatio(pic.filename)"
		:eager="eager"
		:max-width="maxWidth"
		:position="position"
		:contain="contain"
		:cover="cover"
	></v-img>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'BaseImage',
	mixins: [useFormatting],
	props: {
		pic: {
			type: Object,
			required: true
		},
		width: {
			type: String,
			default: '600'
		},
		maxWidth: {
			type: String,
			default: '300'
		},
		eager: {
			type: Boolean,
			default: true
		},
		position: {
			type: String,
			default: 'top center'
		},
		contain: {
			type: Boolean,
			default: true
		},
		cover: {
			type: Boolean,
			default: false
		}
	}
}
</script>
