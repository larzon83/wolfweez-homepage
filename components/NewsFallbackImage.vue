<template>
	<v-img
		alt="Standard News-Bild"
		:src="require('~/assets/img/bg.svg')"
		:aspect-ratio="1.9047619"
		eager
		class="news-fallback-image"
		content-class="content"
	>
		<v-row class="fill-height" align="center" justify="center" no-gutters>
			<v-icon size="80">$wolfNoMoon</v-icon>
		</v-row>
	</v-img>
</template>

<script>
export default {
	name: 'NewsFallbackImage'
}
</script>

<style lang="scss" scoped>
.news-fallback-image {
	opacity: 0.3;

	::v-deep .content {
		background-image: radial-gradient(
			circle,
			rgb(184 192 194 / 88%) 0%,
			rgb(184 192 194 / 88%) 100%
		);
	}
}
</style>
