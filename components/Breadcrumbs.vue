<template>
	<div>
		<v-breadcrumbs
			v-if="$route.name !== 'index'"
			:items="items"
			class="pl-0 d-none d-lg-flex"
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
		<!-- padding on mobile -->
		<div
			v-if="$route.name !== 'index'"
			class="pb-11 d-block d-lg-none"
			style="height: 0"
		></div>
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
.theme--dark.v-breadcrumbs {
	::v-deep .v-breadcrumbs__divider .v-icon {
		color: getcolor('bright', 0.75);
	}
	::v-deep .v-breadcrumbs__item--disabled {
		color: getcolor('bright', 0.6);
	}
}
</style>
