<template>
	<section v-editable="content">
		<h1
			class="
				d-none d-lg-flex
				text-h4 text-sm-h3 text-lg-h2
				font-weight-bold
				pb-4
			"
		>
			{{ content.headline }}
		</h1>
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
