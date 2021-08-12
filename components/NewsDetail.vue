<template>
	<div v-editable="news">
		<div class="news-image px-md-5 pb-5">
			<v-img
				v-if="news.image.filename"
				:alt="news.headline"
				:src="news.image.filename"
				:lazy-src="$_transformImage(news.image.filename, '300x0')"
				:aspect-ratio="$_aspectRatio(news.image.filename)"
				eager
			/>
		</div>
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

.news-image {
	.v-image {
		box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.8);

		::v-deep .v-responsive__sizer {
			background-image: linear-gradient(
				180deg,
				rgba(255, 255, 255, 0) 80%,
				rgba(255, 255, 255, 0.04)
			);
		}
	}
}
</style>
