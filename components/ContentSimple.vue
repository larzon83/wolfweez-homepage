<template>
	<div v-editable="content" class="my-24 mx-auto">
		<h1>{{ content.headline }}</h1>
		<rich-text-renderer v-if="content.text" :document="content.text" />
	</div>
</template>

<script>
export default {
	name: 'ContentSimple',
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
