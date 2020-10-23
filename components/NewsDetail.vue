<template>
	<div v-editable="news" class="prose my-24 mx-auto">
		<h1>{{ news.headline }}</h1>
		<h5>{{ time }}</h5>
		<v-img
			v-if="news.image.filename"
			:src="news.image.filename"
			:alt="'image'"
			eager
			class="py-3"
			max-width="300"
			:transition="false"
			position="top center"
			contain
		></v-img>
		<rich-text-renderer v-if="news.description" :document="news.description" />
	</div>
</template>

<script>
export default {
	name: 'NewsDetail',
	props: {
		news: {
			type: Object,
			required: true
		},
		time: {
			type: String,
			default: ''
		}
	}
}
</script>
