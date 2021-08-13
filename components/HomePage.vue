<template>
	<div v-editable="blok" class="mt-14">
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
			:news-sorted="
				pageBlok.component === sbHomeBloks.NEWS ? newsSorted : undefined
			"
		/>
	</div>
</template>

<script>
import { sbHomeBloks } from '~/utils/constants'

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
			),
		HomepageVideo: () =>
			import(
				/* webpackChunkName: "HomepageVideo" */ '~/components/_storyblok/HomepageVideo'
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
	},

	created() {
		this.sbHomeBloks = sbHomeBloks
	}
}
</script>
