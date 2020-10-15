<template>
	<v-app v-scroll="onScroll">
		<Toolbar :swap-toolbar="swapToolbar" />
		<v-main>
			<v-container class="pt-0">
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
	name: 'Default',
	components: {
		Nav,
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

<style lang="scss" scoped>
.v-main:before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	// background: red;
	height: 65vw;
	background-image: url('~assets/img/bg-top.jpg');
	// background-position: bottom 23px center;
	// background-size: auto 120px;
	background-repeat: repeat-x;
}
</style>
