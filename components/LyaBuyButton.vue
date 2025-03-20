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
								href="https://loveyourartist.com/de/profiles/wolfweez-openair-festival-FIR319/events/wolfweez-openair-2025-dietingen-VCWDRZ"
								target="_blank"
								class="mt-2"
							>
								<v-img
									alt="Ticket Wolfweez OpenAir Festival 2025"
									:width="200"
									:height="200"
									contain
									src="https://lya-assets.s3.eu-central-1.amazonaws.com/public/8997ee03-3649-43ab-a45d-8cac8e5e1c39/1733209645833/wolfweez-avatar-2025.png"
									class="rounded"
								>
								</v-img>
							</a>
							<span class="mt-4"
								>{{ currentFestival.content.date }}
								{{ currentFestival.content.year }}</span
							>
							<v-btn
								href="https://loveyourartist.com/de/profiles/wolfweez-openair-festival-FIR319/events/wolfweez-openair-2025-dietingen-VCWDRZ"
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
							<!-- <h3 class="mt-1">Early Wolf Vorverkauf</h3>
							<v-divider class="my-5" />
							<p>
								Erhalte Kombiticket sowie Campingticket im Aktionszeitraum zum
								vergünstigten Vorverkaufspreis.
							</p>
							<p>Zeitraum: <b>06.12.2024 - 24.12.2024</b></p>
							<ul>
								<li>
									<span>Kombi Ticket: 90€</span>
									<s class="font-italic" style="opacity: 0.4">95€</s>
									<i>(+ 4,90€ VVK Gebühr)</i>
								</li>
								<li>
									<span>Camping Ticket: 20€</span>
									<s class="font-italic" style="opacity: 0.4">22€</s>
									<i>(+ 2€ VVK Gebühr)</i>
								</li>
							</ul> -->
							<slot name="inside" />
							<ul>
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
							</ul>
							<!-- <v-alert
								icon="$info"
								dense
								outlined
								prominent
								text
								class="pa-4 mt-8 mb-0 information--text"
							>
								<p><b>ACHTUNG</b></p>
								<p>
									Die Vorverkaufsstellen (s.u.) werden ab Mitte März
									ausgestattet.
								</p>
							</v-alert> -->
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
