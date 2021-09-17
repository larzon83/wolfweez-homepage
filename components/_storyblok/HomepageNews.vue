<template>
	<div v-if="newsSorted" v-editable="pageBlok" class="mt-16">
		<h2 v-if="pageBlok.headline">{{ pageBlok.headline }}</h2>
		<v-row class="mt-2">
			<v-col
				v-for="news in newsSorted"
				:key="news.content._uid"
				cols="12"
				md="6"
				lg="4"
			>
				<NewsCard :news="news" class="on-homepage" />
			</v-col>
		</v-row>
		<v-row align="center" justify="center" no-gutters class="mt-6">
			<v-btn
				:ripple="false"
				min-width="190"
				color="ahref"
				large
				outlined
				role="link"
				class="btn-more"
				:to="newsOverviewRoute"
			>
				Alle News<v-icon right size="15" color="prime">$arrowRight</v-icon>
			</v-btn>
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

<style lang="scss" scoped>
.btn-more {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;

	@media (max-width: 399px) {
		display: flex;
		flex: 1 0 auto;
		min-width: 100% !important;
		max-width: auto;
	}
}
</style>
