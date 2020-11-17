<template>
	<div v-editable="pageBlok" class="py-8 mb-6 text-5xl font-bold text-center">
		{{ pageBlok.headline }} kkkkkkkkkkkkk
	</div>
</template>

<script>
export default {
	name: 'BlokTeaser',
	props: {
		pageBlok: {
			type: Object,
			required: true
		}
	}
}
</script>
