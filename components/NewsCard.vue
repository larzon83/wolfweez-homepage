<template>
	<v-card
		v-if="news.content"
		:ripple="false"
		:to="$_slashify(news.full_slug)"
		color="darkish"
		flat
		height="100%"
		href
		nuxt
		class="hover-card"
	>
		<v-img
			v-if="news.content.image.filename"
			:alt="news.content.headline"
			:src="news.content.image.filename"
			:lazy-src="$_transformImage(news.content.image.filename, '300x0')"
			:aspect-ratio="1.9047619"
			eager
		/>
		<LazyNewsFallbackImage v-else />

		<v-card-subtitle class="news-date pb-0">
			{{ news.newsDate }}
		</v-card-subtitle>
		<v-card-title class="text-h6 news-title pt-0 pb-4">
			{{ news.content.headline }}
		</v-card-title>
		<v-card-text>
			<rich-text-renderer
				v-if="news.content.description_short"
				:document="news.content.description_short"
			/>
			<!-- TODO: -->
			<!-- <rich-text-renderer
				v-else-if="news.content.description"
				:document="news.content.description"
			/> -->
		</v-card-text>
	</v-card>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'NewsCard',
	mixins: [useFormatting],
	props: {
		news: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/__partials/_hover-card.scss';
@import '~/assets/style/__partials/_news.scss';

.hover-card {
	// hide image when mobile and on homepage
	@media #{map-get($display-breakpoints, 'sm-and-down')} {
		&.on-homepage .v-image {
			display: none;
		}
	}
}
</style>
