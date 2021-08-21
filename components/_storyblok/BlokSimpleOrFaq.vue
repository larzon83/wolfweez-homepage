<template>
	<div v-editable="content">
		<h2 v-if="content.title" class="pb-3">{{ content.title }}</h2>
		<v-row v-editable="content">
			<v-col
				v-for="(blok, index) in computedBlocks"
				:key="`blok-simple-${blok._uid}`"
				cols="12"
				:lg="blok.columnColdLg"
			>
				<rich-text-renderer
					v-if="blok.component === 'BlokSimple' && blok.text"
					:document="blok.text"
				/>
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
	</div>
</template>

<script>
export default {
	name: 'BlokSimpleOrFaq',
	props: {
		content: {
			type: Object,
			required: true
		}
	},

	computed: {
		computedBlocks() {
			if (!this.content.bloks) return undefined

			return this.content.bloks.map(blok => {
				const colsForSimple = blok.two_columns ? '6' : '12'
				blok.columnColdLg = blok.component === 'BlokFaq' ? '12' : colsForSimple
				return blok
			})
		}
	}
}
</script>
