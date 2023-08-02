<template>
	<div v-editable="pageBlok" class="mt-5">
		{{ pageBlok.headline }}
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
