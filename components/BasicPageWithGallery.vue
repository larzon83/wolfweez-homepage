<template>
	<section v-editable="content" class="right">
		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ content.headline }}
		</h1>
		<rich-text-renderer v-if="content.text" :document="content.text" />

		<v-row class="mt-8">
			<v-col cols="12">
				<LightGalleries :galleries="galleries" hide-headline />
			</v-col>
		</v-row>
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
	},

	computed: {
		galleries() {
			return this.content.gallery.length
				? [
						{
							year: this.content.year,
							imgs: this.content.gallery
						}
				  ]
				: []
		}
	}
}
</script>

<style lang="scss" scoped>
.right {
	h2 {
		padding-top: 12px;
	}

	a {
		word-break: break-word;
		overflow-wrap: break-word;
	}

	ul {
		li + li {
			margin-top: 8px;
		}
	}

	hr {
		margin-block: 30px;
		border-width: 1px 0 0 0;
	}
}
</style>
