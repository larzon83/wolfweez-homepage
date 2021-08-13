<template>
	<div v-if="pageBlok.url" v-editable="pageBlok">
		<h2 v-if="pageBlok.headline">{{ pageBlok.headline }}</h2>
		<v-row
			align="center"
			justify="center"
			no-gutters
			class="mt-6"
			style="height: 150px; background: rgba(255, 0, 0, 0.3)"
		>
			{{ pageBlok.url }}
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'HomepageVideo',
	props: {
		pageBlok: {
			type: Object,
			required: true
		}
	}
}
</script>
