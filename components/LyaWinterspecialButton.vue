<template>
	<div>
		<slot />

		<v-card color="darkish" flat>
			<v-card-text>
				<v-row align="center" justify="center" no-gutters>
					<v-row>
						<v-col
							cols="12"
							lg="6"
							xl="4"
							class="buy-ticket-wrapper d-flex flex-column align-center align-self-start rounded dark"
						>
							<a
								href="https://loveyourartist.com/de/profiles/musikinitiative-irslingen-2019-ev-FIR319/events/wolfweez-winter-special-dietingen-DWY1LV"
								target="_blank"
								class="mt-2"
							>
								<v-img
									alt="Ticket Wolfweez Winter Special 2025"
									:width="200"
									:height="200"
									contain
									src="https://lya-assets.s3.eu-central-1.amazonaws.com/public/8997ee03-3649-43ab-a45d-8cac8e5e1c39/1759269452658/wolfweez-winterspecial-2025-lya.png"
									class="rounded"
								>
								</v-img>
							</a>
							<!-- TODO: make dynamic in SB -->
							<span class="mt-4">29. November 2025</span>
							<v-btn
								href="https://loveyourartist.com/de/profiles/musikinitiative-irslingen-2019-ev-FIR319/events/wolfweez-winter-special-dietingen-DWY1LV"
								target="_blank"
								:ripple="false"
								color="prime"
								depressed
								large
								min-width="190"
								class="mt-4 mb-2"
							>
								Jetzt kaufen<v-icon size="15" class="ml-2"
									>$shoppingCart</v-icon
								>
							</v-btn>
						</v-col>
						<v-col cols="12" lg="6" xl="8">
							<h3 class="mt-1">Winter Special 2025 Tribute Bands</h3>
							<v-divider class="my-5" />
							<p>
								Mit Break Stuff und Mr. Jack System of a Down Tribute Bands.
							</p>
							<ul>
								<li>
									<span>25€</span>
									<i>(+ 2,50€ VVK Gebühr)</i>
								</li>
							</ul>
							<slot name="inside" />
						</v-col>
					</v-row>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'LyaWinterspecialButton',

	computed: {
		...mapState(['currentFestival'])
	}
}
</script>

<style lang="scss" scoped></style>
