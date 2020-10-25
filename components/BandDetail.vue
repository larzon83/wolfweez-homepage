<template>
	<div v-editable="band" class="prose my-24 mx-auto">
		<h1>{{ band.name }}</h1>
		<h5>{{ time }}</h5>
		<v-img
			v-if="band.logo.filename"
			:lazy-src="$_transformImage(band.logo.filename, '300x0')"
			:src="band.logo.filename"
			:alt="'Logo'"
			eager
			class="py-3"
			max-width="300"
			:transition="false"
			position="top center"
			contain
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
