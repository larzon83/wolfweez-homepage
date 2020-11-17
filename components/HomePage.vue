<template>
	<div v-editable="blok" class="px-6">
		<!-- <Teaser :blok2="blok.body[0]" /> -->
		<!-- blok: {{ blok }} -->

		<!-- <div v-for="pageBlok in blok.body" :key="pageBlok._uid">
			<div>
				{{ pageBlok.component }}
			</div>
		</div> -->

		<!-- <BlokTeaser :page-blok="blok.body[0]" />
		<BlokGrid :page-blok="blok.body[1]" /> -->

		<component
			:is="pageBlok.component"
			v-for="pageBlok in blok.body"
			:key="`page-blok-${pageBlok._uid}`"
			:page-blok="pageBlok"
		/>
	</div>
</template>

<script>
export default {
	name: 'HomePage',
	components: {
		BlokGrid: () =>
			import(
				/* webpackChunkName: "BlokGrid" */ '~/components/_storyblok/BlokGrid'
			),
		BlokTeaser: () =>
			import(
				/* webpackChunkName: "BlokTeaser" */ '~/components/_storyblok/BlokTeaser'
			)
	},

	props: {
		blok: {
			type: Object,
			required: true
		}
	}
}
</script>
