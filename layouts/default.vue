<template>
	<v-app v-scroll="onScroll">
		<Toolbar :swap-toolbar="swapToolbar" />
		<v-main>
			<Header />
			<v-container class="pt-0 pb-16">
				<MainNav />
				<TabsNavigation />
				<Breadcrumbs />
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
			offsettop: 0,
			swapToolbar: false
		}
	},

	methods: {
		onScroll(e) {
			this.offsettop = window.pageYOffset
			if (this.offsettop > 105) this.swapToolbar = true
			else this.swapToolbar = false
		}
	}
}
</script>
