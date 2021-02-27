<template>
	<v-breadcrumbs
		v-if="$route.name !== 'index'"
		:items="items"
		class="px-0 pt-1 crumbs"
	>
		<template #divider>
			<v-icon size="13">$chevronRight</v-icon>
		</template>
		<template #item="{ item }">
			<v-breadcrumbs-item exact nuxt :to="item.to">
				{{ item.title }}
			</v-breadcrumbs-item>
		</template>
	</v-breadcrumbs>
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
	font-size: 0.8125rem; // 13px
}
</style>
