<template>
	<v-card color="darkish" flat>
		<v-card-text
			class="d-flex flex-column align-center align-self-start rounded"
		>
			<slot />

			<a
				href="https://loveyourartist.com/de/profiles/musikinitiative-irslingen-2019-ev-FIR319/events/wolfweez-openair-2027-dietingen-EISK9YJ"
				target="_blank"
				class="mt-2"
			>
				<v-img
					alt="Ticket Wolfweez OpenAir Festival 2027"
					:width="200"
					:height="200"
					contain
					src="https://loveyourartist.imgix.net/public/8997ee03-3649-43ab-a45d-8cac8e5e1c39/1791381570366/wolfweez-imagemotiv-2027-final-wolf-schriftzug.jpg?auto=format&compress&q=75&h=400&dpr=2"
					class="rounded"
				>
				</v-img>
			</a>
			<span class="mt-4"
				>{{
					dateCustom ||
					`${currentFestival.content.date} ${currentFestival.content.year}`
				}}
			</span>
			<v-btn
				href="https://loveyourartist.com/de/profiles/musikinitiative-irslingen-2019-ev-FIR319/events/wolfweez-openair-2027-dietingen-EISK9YJ"
				target="_blank"
				:ripple="false"
				color="prime"
				depressed
				large
				min-width="190"
				class="mt-4 mb-2"
			>
				Jetzt kaufen<v-icon size="15" class="ml-2">$shoppingCart</v-icon>
			</v-btn>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'LyaBuyButton2',

	props: {
		dateCustom: {
			type: String,
			default: undefined
		}
	},

	computed: {
		...mapState(['currentFestival'])
	}
}
</script>

<style lang="scss" scoped></style>
