<template>
	<v-card color="darkish" flat>
		<v-card-text
			class="d-flex flex-column align-center align-self-start rounded"
		>
			<slot />

			<a
				href="https://loveyourartist.com/de/profiles/musikinitiative-irslingen-2019-ev-FIR319/events/wolfweez-openair-2026-dietingen-MMF5EO"
				target="_blank"
				class="mt-2"
			>
				<v-img
					alt="Ticket Wolfweez OpenAir Festival 2026"
					:width="200"
					:height="200"
					contain
					src="https://loveyourartist.imgix.net/public/8997ee03-3649-43ab-a45d-8cac8e5e1c39/1753900055656/250730_Wolfweez_Imagemotiv_2026_1zu1_aufSchwarz.jpg?pjpg=format&w=400"
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
				href="https://loveyourartist.com/de/profiles/musikinitiative-irslingen-2019-ev-FIR319/events/wolfweez-openair-2026-dietingen-MMF5EO"
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
