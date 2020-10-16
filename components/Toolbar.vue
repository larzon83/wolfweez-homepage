<template>
	<div>
		<v-navigation-drawer
			v-model="drawer"
			fixed
			app
			right
			temporary
			width="100vw"
			height="auto"
			style="padding-bottom: 100px"
		>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action></v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar
			app
			fixed
			tile
			:flat="!swapToolbar"
			:color="swapToolbar ? '#202020' : 'transparent'"
			height="64"
			:class="{
				elevate: swapToolbar
			}"
		>
			<!-- <v-toolbar-title v-text="toolbarTitle" /> -->
			<v-spacer />
			<!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->

			<v-btn
				:ripple="false"
				to="/"
				nuxt
				active-class="aaa"
				text
				tile
				color="#202020"
				class="ma-0"
				>Home</v-btn
			>
			<v-btn
				:ripple="false"
				to="/line-up"
				nuxt
				active-class="aaa"
				text
				tile
				color="#202020"
				class="ma-0"
				>Line-up</v-btn
			>
			<v-btn
				:ripple="false"
				to="/bands"
				nuxt
				active-class="aaa"
				text
				tile
				color="#202020"
				class="ma-0"
				>Bands</v-btn
			>

			<v-btn
				v-if="$vuetify.breakpoint.mdAndDown"
				icon
				@click="drawer = !drawer"
			>
				<img :src="menuIcon" width="25" height="14" alt="Menü öffnen" />
			</v-btn>

			<!-- <template v-slot:extension>
				<v-tabs align-with-title>
					<v-tab>Tab 1</v-tab>
					<v-tab>Tab 2</v-tab>
					<v-tab>Tab 3</v-tab>
				</v-tabs>
			</template> -->
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: 'Toolbar',
	props: {
		swapToolbar: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			drawer: false,
			items: [
				{
					title: 'Home',
					to: '/'
				},
				{
					title: 'Line-up',
					to: '/line-up'
				},
				{
					title: 'Bands',
					to: '/bands'
				}
			],
			toolbarTitle: 'WW'
		}
	},

	computed: {
		menuIcon() {
			const fileAddition = this.swapToolbar ? 'light' : 'dark'
			return require(`~/assets/icons/menu-${fileAddition}.svg`)
		}
	}

	// watch: {
	// 	'$store.state.general.moreClicked': {
	// 		handler(val) {
	// 			if (val === true) {
	// 				this.drawer = true
	// 				this.$store.commit('general/RESET_MORE')
	// 			}
	// 		}
	// 	}
	// }
}
</script>

<style lang="scss" scoped>
.elevate {
	box-shadow: 0 0 40px -20px rgba(0, 0, 0, 0.8) !important;
}

.aaa {
	color: #fff !important;
	background: #e05e5e;

	&:before {
		opacity: 0 !important;
	}
}

.v-navigation-drawer--close.v-navigation-drawer--temporary {
	transform: translateY(-13vw) !important;
}

// .v-app-bar ::v-deep .v-toolbar__content {
// 	align-items: flex-start;
// 	padding-top: 10px;
// }
</style>
