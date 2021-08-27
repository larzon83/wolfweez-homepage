<template>
	<div class="news-image px-md-5 pb-5" :class="{ gradient: gradient }">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'DetailImage',
	props: {
		gradient: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss" scoped>
.news-image .v-image {
	border-radius: $border-radius-root;
}

.news-image.gradient .v-image {
	::v-deep .v-responsive__sizer {
		background-image: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 80%,
			rgba(255, 255, 255, 0.04)
		);
	}
}
</style>
