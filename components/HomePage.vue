<template>
	<div v-editable="blok">
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
			:news-sorted="newsSorted"
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
			),
		HomepageNews: () =>
			import(
				/* webpackChunkName: "HomepageNews" */ '~/components/_storyblok/HomepageNews'
			)
	},

	props: {
		blok: {
			type: Object,
			required: true
		},
		newsSorted: {
			type: Array,
			default: undefined
		}
	}
}
</script>
