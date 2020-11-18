<template>
	<div v-editable="content" class="my-24 mx-auto">
		<div class="pb-6">
			<h1>{{ content.headline }}</h1>
		</div>

		<div
			v-for="blok in content.bloks"
			:key="`blok-content-${blok._uid}`"
			class="mt-8"
		>
			<h2>{{ blok.headline }}</h2>

			<div v-for="pic in blok.pics" :key="`blok-pic-${pic.id}`" class="py-3">
				<v-img
					v-if="pic.filename"
					:alt="`TODO: Bild alt`"
					:src="$_transformImage(pic.filename, '600x0')"
					:lazy-src="$_transformImage(pic.filename, '6x0')"
					aspect-ratio="1.5"
					eager
					max-width="300"
					position="top center"
					contain
				></v-img>
			</div>
			<rich-text-renderer v-if="blok.text" :document="blok.text" />
		</div>
	</div>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'BlokContent',
	mixins: [useFormatting],
	props: {
		content: {
			type: Object,
			required: true
		}
	}
}
</script>
