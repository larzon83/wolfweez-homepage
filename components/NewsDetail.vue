<template>
	<div v-editable="news">
		<DetailImage gradient>
			<v-img
				v-if="news.image && news.image.filename"
				:alt="news.headline"
				:src="news.image.filename"
				:lazy-src="$_transformImage(news.image.filename, '300x0')"
				:aspect-ratio="$_aspectRatio(news.image.filename)"
				eager
			/>
		</DetailImage>
		<div class="news-date">{{ newsDate }}</div>
		<h1 class="pb-4">{{ news.headline }}</h1>
		<rich-text-renderer v-if="news.description" :document="news.description" />
	</div>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'NewsDetail',
	mixins: [useFormatting],
	props: {
		news: {
			type: Object,
			required: true
		},
		newsDate: {
			type: String,
			default: ''
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/__partials/_news.scss';
</style>
