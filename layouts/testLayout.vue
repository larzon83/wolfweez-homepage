<template>
	<v-app>
		<Toolbar />
		<v-main>
			<v-container class="pt-6">
				<nuxt />
			</v-container>
		</v-main>
		<Nav />
	</v-app>
</template>

<script>
import Nav from '~/components/Nav'
import Toolbar from '~/components/Toolbar'

export default {
	name: 'TestLayout',
	components: {
		Nav,
		Toolbar
	}
}
</script>
