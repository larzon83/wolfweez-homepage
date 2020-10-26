<template>
	<v-tabs optional background-color="transparent" class="mb-10">
		<v-tab
			v-for="(tab, i) in tabItems"
			:key="`lineup-tab-${i}`"
			:ripple="false"
			:to="tab.to"
			nuxt
			active-class="aaa"
			text
			tile
			color="#202020"
			class="ma-0"
			>{{ tab.title }}</v-tab
		>
	</v-tabs>
</template>

<script>
export default {
	name: 'TabsLineup',

	data() {
		return {
			tabItems: [
				{
					title: 'Bands',
					to: '/line-up/bands/'
				},
				{
					title: 'Timetable',
					to: '/line-up/timetable/'
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped></style>
