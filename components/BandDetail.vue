<template>
	<div v-editable="band">
		<h1>{{ band.name }}</h1>
		<h5>{{ time }}</h5>
		<v-img
			v-if="band.logo && band.logo.filename"
			:alt="`Logo ${band.name}`"
			:src="$_transformImage(band.logo.filename, '600x0')"
			:lazy-src="$_transformImage(band.logo.filename, '300x0')"
			eager
			class="py-3"
			max-width="300"
			position="top center"
			contain
		></v-img>
		<v-img
			v-if="band.image && band.image.filename"
			:alt="band.name"
			:src="$_transformImage(band.image.filename, '600x0')"
			:lazy-src="$_transformImage(band.image.filename, '300x0')"
			:aspect-ratio="$config.aspectRatios.BAND"
			eager
			:position="$_shiftImagePositionY(band.image_offset)"
		></v-img>
		<rich-text-renderer v-if="band.description" :document="band.description" />
	</div>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'BandDetail',
	mixins: [useFormatting],

	props: {
		band: {
			type: Object,
			required: true
		},
		time: {
			type: String,
			default: ''
		}
	}
}
</script>
