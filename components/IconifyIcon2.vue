<template>
	<client-only>
		<IconifyIcon :icon="icon" />
	</client-only>
</template>

<script>
import IconifyIcon from '@iconify/vue'

export default {
	components: {
		IconifyIcon
	},
	props: {
		icon: {
			type: Object,
			required: true
		}
	}

	// mounted() {
	// 	console.log('heyyyyyyyyyy: ', this.icon)
	// }
}
</script>
