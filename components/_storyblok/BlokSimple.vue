<template>
	<v-row v-editable="content" class="pt-0">
		<v-col
			v-for="(blok, index) in computedBlocks"
			:key="`blok-simple-${blok._uid}`"
			cols="12"
			:lg="blok.columnColdLg"
			:class="blok.columnClass"
		>
			<rich-text-renderer v-if="blok.text" :document="blok.text" />
			<!-- TODO: insert Google Maps -->
			<div v-else-if="blok.component === 'BlokMap'">
				Google Maps<br />
				{{ blok.long }}<br />
				{{ blok.lat }}
			</div>
			<div v-else-if="blok.component === 'BlokFaq'">
				<h2>{{ blok.question }}</h2>
				<rich-text-renderer :document="blok.answer" />
				<v-divider
					v-if="index !== computedBlocks.length - 1"
					class="mt-11 mt-md-13 pb-5 pb-md-7"
				/>
			</div>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'BlokSimple',
	props: {
		content: {
			type: Object,
			required: true
		}
	},

	computed: {
		computedBlocks() {
			return this.content.bloks.map(blok => {
				let columnClass = ''
				let columnColdLg = '6'

				if (blok.component === 'BlokMap') {
					columnClass = 'order-first-on-mobile'
				}

				if (blok.component === 'BlokFaq') {
					columnColdLg = '12'
				}

				blok.columnClass = columnClass
				blok.columnColdLg = columnColdLg

				return blok
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@media #{map-get($display-breakpoints, 'md-and-down')} {
	.order-first-on-mobile {
		order: -1;
	}
}
</style>
