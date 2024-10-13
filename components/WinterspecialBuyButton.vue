<template>
	<div>
		<slot />

		<v-card color="darkish" flat>
			<v-card-text>
				<v-row align="center" justify="center" no-gutters>
					<v-row>
						<v-col
							v-for="(btn, idx) in buyButtons"
							:key="`btn-${idx}-${btn.buyButtonId}`"
							cols="12"
							lg="6"
							xl="4"
							class="d-flex justify-center ma-n2"
						>
							<ClientOnly>
								<stripe-buy-button
									:buy-button-id="btn.buyButtonId"
									:publishable-key="btn.publishableKey"
								>
								</stripe-buy-button>
							</ClientOnly>
						</v-col>
						<v-col cols="12" lg="6" xl="8">
							<h3 class="mt-1">Jetzt Ticket für nur 33 € sichern! *</h3>
							<v-divider class="my-5" />
							<v-alert
								icon="$info"
								dense
								outlined
								prominent
								text
								class="pa-4 mb-4 information--text"
							>
								<p><b>ACHTUNG</b></p>
								<p>
									Diese Online-Tickets sind nur für den Tribute Bands Abend am
									Samstag bestimmt.
								</p>
								<p>
									Tickets für den Bandcontest am Freitag gibt es nur an der
									Abendkasse.
								</p>
							</v-alert>
							<p>
								Hard-Tickets sind ebenfalls in allen offiziellen VVK-Stellen
								erhältlich (s.u.), sowie bei Eventim und ReserviX.
							</p>

							<p>
								Und natürlich (sofern nicht ausverkauft) an der Abendkasse (hier
								aber deutlich teurer).
							</p>
							<p class="font-italic" style="opacity: 0.4">
								<small> *inklusive MwSt., Druck- & Logistikgebühren </small>
							</p>
						</v-col>
					</v-row>
				</v-row>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'WinterspecialBuyButton',

	head() {
		return {
			script: [
				{
					src: 'https://js.stripe.com/v3/buy-button.js',
					async: true
				}
			]
		}
	},

	computed: {
		buyButtons() {
			// dev
			if (process.env.NUXT_ENV_TEST_MODE === 'true') {
				const publishableKey =
					'pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc'
				return [
					{
						buyButtonId: 'buy_btn_1Q11H1BfAFuG6uOso4ZOt0EZ',
						publishableKey
					}
				]
			}

			// real
			const publishableKey =
				'pk_live_51IP7XYBfAFuG6uOsT6iPXBc5tAIj8xOiOSDprjvToPCV3wrzchcqQe3p8WdZJbBvAYrMAUDaE7dg6GevBgzOwTMd00CXYTn8IM'
			return [
				{
					buyButtonId: 'buy_btn_1Q11N7BfAFuG6uOslxgCZDT7',
					publishableKey
				}
			]
		}
	}
}
</script>

<style lang="scss" scoped></style>
