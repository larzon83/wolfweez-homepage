<template>
	<v-app dark>
		<h1 v-if="error.statusCode === 404">
			{{ pageNotFound }}
		</h1>
		<h1 v-else>
			{{ otherError }}
		</h1>
		<NuxtLink to="/">zur Startseite</NuxtLink>
	</v-app>
</template>

<script>
export default {
	layout: 'empty',

	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError
		return {
			title
		}
	},

	props: {
		error: {
			type: Object,
			default: null
		}
	},

	created() {
		this.pageNotFound = '404 - Seite nicht gefunden'
		this.otherError = 'Ein Fehler ist aufgetreten'
	}
}
</script>

<style lang="scss" scoped>
h1 {
	font-size: $size20;
}
</style>
