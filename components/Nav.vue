<template>
	<v-bottom-navigation>
		<v-btn @click="showDrawer">
			<span>MORE</span>
			<v-icon>mdi-history</v-icon>
		</v-btn>
	</v-bottom-navigation>
</template>

<script>
export default {
	name: 'Nav',

	methods: {
		showDrawer() {
			this.$store.commit('general/SET_MORE')
		}
	}
}
</script>
