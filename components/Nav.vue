<template>
	<v-bottom-navigation>
		<v-btn aria-label="Menü öffnen" role="button" @click="showDrawer">
			<span>MORE</span>
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
