<template>
	<div>
		<v-navigation-drawer v-model="drawer" fixed app>
			<v-list>
				<v-list-item
					v-for="(item, i) in items"
					:key="i"
					:to="item.to"
					router
					exact
				>
					<v-list-item-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar fixed app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" />
			<v-toolbar-title v-text="title" />
			<v-spacer />
		</v-app-bar>
	</div>
</template>

<script>
export default {
	name: 'Toolbar',
	data() {
		return {
			drawer: null,
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/'
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Inspire',
					to: '/inspire'
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'test',
					to: '/test'
				}
			],
			right: true,
			title: 'Vuetify.js'
		}
	},

	watch: {
		'$store.state.general.moreClicked': {
			handler(val) {
				if (val === true) {
					this.drawer = true
					this.$store.commit('general/RESET_MORE')
				}
			}
		}
	}
}
</script>
