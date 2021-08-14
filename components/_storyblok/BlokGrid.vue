<template>
	<div>
		<div>BlokGrid:</div>
		<ul v-editable="pageBlok" class="flex">
			<li
				v-for="blokGrid in pageBlok.columns"
				:key="`blok-grid-${blokGrid._uid}`"
				class="flex-auto px-6"
			>
				<!-- <BlokFeature :grid-blok="blokGrid" /> -->
				<component :is="blokGrid.component" :grid-blok="blokGrid" />
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'BlokGrid',
	components: {
		BlokFeature: () =>
			import(
				/* webpackChunkName: "BlokFeature" */ '~/components/_storyblok/BlokFeature'
			)
	},

	props: {
		pageBlok: {
			type: Object,
			required: true
		}
	}
}
</script>
