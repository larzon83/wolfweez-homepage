<template>
	<div class="pb-4">
		<nuxt-link :to="route" class="on-hover">
			<v-icon size="15" color="prime" class="mr-1">$arrowLeft</v-icon
			>{{ label }}
		</nuxt-link>
	</div>
</template>

<script>
export default {
	name: 'GoBackHeader',
	props: {
		route: {
			type: String,
			default: '/'
		},
		label: {
			type: String,
			default: ''
		}
	}
}
</script>
