<template>
	<section v-editable="content">
		<h1 class="d-none d-lg-flex">{{ content.headline }}</h1>
		<rich-text-renderer v-if="content.text" :document="content.text" />
	</section>
</template>

<script>
export default {
	name: 'BasicPage',
	props: {
		content: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.right {
	h4 {
		text-decoration: underline;
	}
	a {
		word-break: break-word;
		overflow-wrap: break-word;
	}
}
</style>
