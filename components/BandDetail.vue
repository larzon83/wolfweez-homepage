<template>
	<div v-editable="band" class="prose my-24 mx-auto">
		<h1>{{ band.name }}</h1>
		<p>{{ band.description }}</p>
		<!-- <rich-text-renderer :document="band.body" /> -->
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
