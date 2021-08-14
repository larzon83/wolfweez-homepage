<template>
	<div v-editable="pageBlok" class="py-8 font-bold mt-16">
		BlokTeaser: {{ pageBlok.headline }}
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
