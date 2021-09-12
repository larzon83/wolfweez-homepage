<template>
	<div v-editable="news">
		<div class="px-md-5 pb-5">
			<SbImage
				v-if="news.image_social && news.image_social.filename"
				:alt="news.headline"
				:pic="news.image_social"
				:preset="$config.presetNames.NEWS_DETAIL"
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

.v-image {
	::v-deep .v-responsive__sizer {
		background-image: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 80%,
			rgba(255, 255, 255, 0.04)
		);
	}
}
</style>
