<template>
	<div v-editable="gridBlok" class="py-2">
		<span class="text-lg">{{ gridBlok.name }}</span>
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
