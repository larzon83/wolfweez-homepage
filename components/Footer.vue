<template>
	<div>
		<v-footer dark padless class="pb-3">
			<v-container class="py-0">
				<v-row justify="start" no-gutters>
					<v-col
						v-for="(section, sectionIndex) in sections"
						:key="`section-${sectionIndex}`"
						class="py-4"
						cols="6"
						md="3"
					>
						<v-card flat tile color="transparent">
							<v-subheader class="sub-headline text-button pl-0">{{
								section.title
							}}</v-subheader>
							<v-list dense flat tile color="transparent" class="pt-0">
								<v-list-item
									v-for="(link, linkIndex) in section.links"
									:key="`link-${linkIndex}`"
									class="pl-0"
									style="min-height: auto"
								>
									<v-list-item-content class="pa-0">
										<v-list-item-action class="my-1">
											<nuxt-link :to="link.to">
												{{ link.title }}
											</nuxt-link></v-list-item-action
										>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-card>
					</v-col>
				</v-row>
				<v-row
					align="center"
					no-gutters
					class="powered-by justify-center justify-md-start mt-5"
				>
					<v-subheader
						class="
							sub-headline
							text-button
							justify-center justify-md-start
							pl-0
							pr-0 pr-md-4
						"
						>Powered by</v-subheader
					>
					<SponsorItem
						v-for="sponsor in mainSponsors.story.content.sponsors_list"
						:key="`footer-sponsor-${sponsor._uid}`"
						v-editable="sponsor"
						:preset="presetSponsorMainFooter"
						:sponsor="sponsor"
					/>
				</v-row>
				<v-row justify="center" no-gutters class="mt-6 mt-md-11">
					<v-btn
						:ripple="false"
						:aria-label="`${siteTitle} auf Facebook`"
						href="https://www.facebook.com/WolfweezOpenAir/"
						icon
						rel="noreferrer"
						target="_blank"
						class="mr-1"
					>
						<v-icon>$facebook</v-icon>
					</v-btn>
					<v-btn
						:ripple="false"
						:aria-label="`${siteTitle} auf Instagram`"
						href="https://www.instagram.com/wolfweez_openair_/"
						icon
						rel="noreferrer"
						target="_blank"
					>
						<v-icon>$instagram</v-icon>
					</v-btn>
				</v-row>
			</v-container>
		</v-footer>
		<v-footer dark padless>
			<v-card flat tile color="transparent" class="text-center" width="100%">
				<v-divider></v-divider>
				<v-card-text>
					{{ new Date().getFullYear() }} — <strong>{{ siteTitle }}</strong>
				</v-card-text>
			</v-card>
		</v-footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { routeMeta, siteTitle, tabTypes } from '~/utils/constants'
import { presetNames } from '~/utils/responsive-images'

export default {
	name: 'Footer',

	computed: {
		...mapState(['mainSponsors', 'subNavItems']),

		sections() {
			return [
				{
					title: routeMeta.INFOS.title,
					links: this.subNavItems[tabTypes.INFOS]
				},
				{
					title: routeMeta.LINEUP.title,
					links: this.subNavItems[tabTypes.LINEUP]
				},
				{
					title: 'Dies & Das',
					links: [
						{ ...routeMeta.MEDIEN__FOTOGALERIE },
						{ ...routeMeta.SPONSOREN }
					]
				},
				{
					title: routeMeta.RECHTLICHES.title,
					links: [
						{ ...routeMeta.RECHTLICHES__KONTAKT },
						{ ...routeMeta.RECHTLICHES__AGB },
						{ ...routeMeta.RECHTLICHES__DATENSCHUTZ },
						{ ...routeMeta.RECHTLICHES__IMPRESSUM }
					]
				}
			]
		}
	},

	created() {
		this.presetSponsorMainFooter = presetNames.SPONSORS_MAIN_FOOTER
		this.siteTitle = siteTitle.short
	}
}
</script>

<style lang="scss" scoped>
.v-footer {
	box-shadow: none !important;

	.sub-headline {
		color: getcolor('bright', 0.64);
		font-weight: 700;
	}

	.powered-by {
		column-gap: 25px;

		.sub-headline {
			@media #{map-get($display-breakpoints, 'md-and-down')} {
				width: 100%;
			}
		}
	}
}

.v-list ::v-deep {
	.v-list-item__content > * {
		line-height: 1.4;
	}

	a {
		color: getcolor('bright');
		text-decoration: none;
		font-size: $size15;
	}
}
</style>
