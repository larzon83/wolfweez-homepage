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
								>{{ currentFestival.content.date }}
								{{ currentFestival.content.year }}</span
							>
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
								Jetzt kaufen<v-icon size="15" class="ml-2"
									>$shoppingCart</v-icon
								>
							</v-btn>
						</v-col>
						<v-col cols="12" lg="6" xl="8">
							<h3 class="mt-1">Early Wolf Vorverkauf</h3>
							<v-divider class="my-5" />
							<p>
								Erhalte das <b>Kombi Ticket</b> in dieser limitierten
								Ticketaktion zum vergünstigten Vorverkaufspreis. 250 Stück im
								Verkauf.
							</p>
							<!-- <p>Zeitraum: <b>01.09.2025 - 01.11.2025</b></p> -->
							<ul>
								<li>
									<span>Kombi Ticket: 95€</span>
									<s class="font-italic" style="opacity: 0.4">105€</s>
									<i>(+ 6,65€ VVK Gebühr)</i>
								</li>
								<li>
									<span>Camping Ticket: 25€</span>
									<i>(+ 1,75€ VVK Gebühr)</i>
								</li>
							</ul>
							<slot name="inside" />
							<!-- <ul>
								<li>
									<span>Kombi Ticket: 95€</span>
									<i style="opacity: 0.4">(+ 4,90€ VVK Gebühr)</i>
								</li>
								<li>
									<span>Tagesticket Freitag: 50,00€</span>
									<i style="opacity: 0.4">(+ 3,50€ VVK Gebühr)</i>
								</li>
								<li>
									<span>Tagesticket Samstag: 60,00€</span>
									<i style="opacity: 0.4">(+ 4,20€ VVK Gebühr)</i>
								</li>
								<li>
									<span>Camping Ticket: 22,00€</span>
									<i style="opacity: 0.4">(+ 2,20€ VVK Gebühr)</i>
								</li>
							</ul> -->
							<v-alert
								icon="$info"
								dense
								outlined
								prominent
								text
								class="pa-4 mt-8 mb-0 information--text"
							>
								<p><b>ACHTUNG</b></p>
								<!-- <p>
									Die Vorverkaufsstellen (s.u.) werden ab Mitte März 2026
									ausgestattet.
								</p> -->
								<p>
									Die Vorverkaufsstellen werden im Frühjahr 2026 ausgestattet.
									<br />
									Tagestickets ebenfalls Frühjahr 2026.
								</p>
							</v-alert>
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
	name: 'LyaBuyButton',

	computed: {
		...mapState(['currentFestival'])
	}
}
</script>

<style lang="scss" scoped></style>
