<template>
	<div v-if="newsSorted" v-editable="pageBlok">
		<h2>Aktuelle News</h2>
		<v-row class="mt-2">
			<v-col
				v-for="news in newsSorted"
				:key="news.content._uid"
				cols="12"
				md="6"
				lg="4"
			>
				<NewsCard :news="news" />
			</v-col>
		</v-row>
		<v-row align="center" justify="center" no-gutters class="mt-6">
			<v-btn
				:ripple="false"
				min-width="190"
				color="bright"
				large
				light
				tile
				role="link"
				:to="newsOverviewRoute"
				>Alle News</v-btn
			>
		</v-row>
	</div>
</template>

<script>
import { routeMeta } from '~/utils/constants'

export default {
	name: 'HomepageNews',
	props: {
		pageBlok: {
			type: Object,
			required: true
		},
		newsSorted: {
			type: Array,
			default: undefined
		}
	},

	created() {
		this.newsOverviewRoute = routeMeta.NEWS.to
	}
}
</script>
