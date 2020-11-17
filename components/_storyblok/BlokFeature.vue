<template>
	<div v-editable="gridBlok" class="py-2">
		<h1 class="text-lg">{{ gridBlok.name }}</h1>
	</div>
</template>

<script>
export default {
	name: 'BlokFeature',
	props: {
		gridBlok: {
			type: Object,
			required: true
		}
	}
}
</script>
