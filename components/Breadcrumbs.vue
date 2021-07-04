<template>
	<div>
		<v-breadcrumbs
			v-if="$route.name !== 'index'"
			:items="items"
			class="px-0 pt-4 pb-12 crumbs d-none d-lg-flex"
		>
			<template #divider>
				<v-icon size="13" color="rgba(255,255,255, 0.7)">$chevronRight</v-icon>
			</template>
			<template #item="{ item }">
				<v-breadcrumbs-item exact nuxt :to="item.to">
					{{ item.title }}
				</v-breadcrumbs-item>
			</template>
		</v-breadcrumbs>
		<div class="pb-11 d-block d-lg-none" style="height: 0"></div>
	</div>
</template>

<script>
import { routeMeta } from '~/utils/constants'

export default {
	name: 'Breadcrumbs',

	computed: {
		items() {
			return [{ ...routeMeta.HOME }, ...this.$store.state.central.crumbs]
		}
	}
}
</script>

<style lang="scss" scoped>
.crumbs li {
	font-size: $size13;
}
</style>
