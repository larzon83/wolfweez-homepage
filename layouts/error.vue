<template>
	<v-app dark>
		<h1 class="text-h4 text-sm-h3 text-lg-h2 font-weight-bold pt-lg-11">
			<span v-if="error.statusCode === 404">{{ pageNotFound }}</span>
			<span v-else>{{ otherError }}</span>
		</h1>
		<GoBackHeader label="zur Startseite" class="mt-5" />
	</v-app>
</template>

<script>
export default {
	name: 'ErrorPage',
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
