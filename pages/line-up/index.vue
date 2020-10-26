<template>
	<section></section>
</template>

<script>
export default {
	name: 'LineUp',

	head() {
		return {
			title: 'Line-Up',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'description description description' // TODO:
				}
			]
		}
	},

	middleware(context) {
		context.redirect(301, '/line-up/bands/')
	}
}
</script>
