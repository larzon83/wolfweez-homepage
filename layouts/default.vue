<template>
	<v-app>
		<TheToolbar :swap-toolbar="isIntersecting" />
		<v-main>
			<TheHeader />
			<v-container class="pt-0 pb-16">
				<MainNav />
				<TabsNavigation />
				<BreadcrumbsBar
					v-intersect="{
						handler: onIntersect,
						options: {
							threshold: [0, 0.5, 1.0]
						}
					}"
				/>
				<nuxt />
			</v-container>
			<TheFooter />
			<LazyUpdateBanner
				v-if="updateBannerVisible"
				@doReload="reloadPage"
				@hideUpdateBanner="updateBannerVisible = false"
			/>
		</v-main>
	</v-app>
</template>

<script>
import TheToolbar from '~/components/TheToolbar'

export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Default',
	components: {
		TheToolbar
	},

	data() {
		return {
			isIntersecting: false,
			updateBannerVisible: false
		}
	},

	// async mounted() {
	// 	const workbox = await window.$workbox

	// 	if (workbox) {
	// 		console.log('workbox in window')
	// 		workbox.addEventListener('installed', event => {
	// 			console.log('sw: installed')
	// 			if (event.isUpdate) {
	// 				console.log('sw: update available')
	// 				this.updateBannerVisible = true
	// 				// window.location.replace('/news/')
	// 				// window.location.reload()
	// 			}
	// 		})
	// 	}
	// },

	methods: {
		onIntersect(entries, observer) {
			// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
			this.isIntersecting = entries[0].intersectionRatio < 0.5
		},

		reloadPage() {
			this.updateBannerVisible = false
			this.$nuxt.$router.go({
				path: this.$nuxt.$router.currentRoute,
				force: true
			})
		}
	}
}
</script>
