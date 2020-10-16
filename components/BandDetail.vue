<template>
	<div v-editable="band" class="prose my-24 mx-auto">
		<h1>{{ band.name }}</h1>
		<v-img
			v-if="band.logo.filename"
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
		}
	}
}
</script>
