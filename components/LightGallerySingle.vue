<template>
	<!-- Placeholder for lightgallery -->
	<div v-if="filename" :id="'lightgallery-' + imgIdent" />
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'
import { lightgalleryOptions } from '~/utils/constants'

export default {
	name: 'LightGallerySingle',
	mixins: [useFormatting],

	props: {
		alt: {
			type: String,
			default: ''
		},
		filename: {
			type: String,
			default: undefined
		},
		imgIdent: {
			type: String,
			default: ''
		},
		subHtml: {
			type: String,
			default: ''
		}
	},

	computed: {
		dynamicElement() {
			return [
				{
					downloadUrl: this.filename,
					subHtml: this.subHtml,
					alt: this.alt,
					responsive: `
							${this.$_transformImage(this.filename, '329x0')} 340,
							${this.$_transformImage(this.filename, '529x0')} 540,
							${this.$_transformImage(this.filename, '773x0')} 784,
							${this.$_transformImage(this.filename, '1253x0')} 1264,
							${this.$_transformImage(this.filename, '1589x0')} 1600
							`,
					src: this.filename,
					thumb: this.$_transformImage(this.filename, '96x96')
				}
			]
		}
	},

	methods: {
		openGallery() {
			const lg = document.getElementById(`lightgallery-${this.imgIdent}`)

			window.lightGallery(lg, {
				...lightgalleryOptions,
				dynamicEl: this.dynamicElement
			})
		}
	}
}
</script>
