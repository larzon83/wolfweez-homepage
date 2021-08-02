<template>
	<v-app>
		<Toolbar :swap-toolbar="isIntersecting" />
		<v-main>
			<Header />
			<v-container class="pt-0 pb-16">
				<MainNav />
				<TabsNavigation />
				<Breadcrumbs
					v-intersect="{
						handler: onIntersect,
						options: {
							threshold: [0, 0.5, 1.0]
						}
					}"
				/>
				<nuxt />
			</v-container>
			<Footer />
		</v-main>
	</v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar'

export default {
	name: 'Default',
	components: {
		Toolbar
	},

	data() {
		return {
			isIntersecting: false
		}
	},

	methods: {
		onIntersect(entries, observer) {
			// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
			this.isIntersecting = entries[0].intersectionRatio < 0.5
		}
	}
}
</script>
