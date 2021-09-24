<template>
	<v-alert class="px-4 pt-5 pb-4 pb-md-6 mb-0">
		<v-row v-if="headline" align="center" justify="start" no-gutters>
			<div style="width: 40px">
				<v-icon>{{ icon }}</v-icon>
			</div>
			<v-col>
				<div class="text-h4 font-weight-bold">{{ headline }}</div>
			</v-col>
		</v-row>
		<div class="mx-md-10 pt-3">
			<slot />
		</div>
	</v-alert>
</template>

<script>
export default {
	name: 'CheckoutStatusBox',
	props: {
		headline: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		}
	}
}
</script>
