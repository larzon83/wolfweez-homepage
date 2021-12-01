<template>
	<v-footer app fixed color="information" class="slide-top px-4 py-3">
		<v-row class="align-center" no-gutters>
			<v-col cols="2" md="1">
				<v-btn :ripple="false" icon small @click="$emit('hideUpdateBanner')">
					<v-icon small>$close</v-icon>
				</v-btn>
			</v-col>
			<v-col cols="8" sm="10" class="text-body-2">
				<v-row
					class="flex-column flex-sm-row align-center justify-center justify-sm-end justify-md-center"
					no-gutters
				>
					<div class="text-center mr-sm-1 pb-1 pb-sm-0">
						Neuer Inhalt verfügbar
					</div>
					<v-btn
						:ripple="false"
						color="bright"
						depressed
						rounded
						small
						class="update-btn ml-sm-1 mt-1 mt-sm-0"
						@click="$emit('doReload')"
					>
						<v-icon left x-small>$refresh</v-icon>
						Update
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	name: 'UpdateBanner'
}
</script>

<style lang="scss" scoped>
.update-btn {
	text-transform: none;
	color: getcolor('darkish', 0.8);
}
</style>
