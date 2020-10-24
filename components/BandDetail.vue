<template>
	<div v-editable="band" class="prose my-24 mx-auto">
		<h1>{{ band.name }}</h1>
		<h5>{{ time }}</h5>
		<v-img
			v-if="band.logo.filename"
			:lazy-src="transformImage(band.logo.filename, '300x0')"
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
export default {
	name: 'BandDetail',
	props: {
		band: {
			type: Object,
			required: true
		},
		time: {
			type: String,
			default: ''
		}
	},

	methods: {
		transformImage(image, option) {
			if (!image) return ''
			if (!option) return ''

			const imageService = 'https://img2.storyblok.com/'
			const path = image.replace('https://a.storyblok.com', '')
			return imageService + option + path
		}
	}
}
</script>
