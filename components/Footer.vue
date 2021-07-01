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
							<v-subheader class="text-button font-weight-regular pl-0">{{
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
			</v-container>
		</v-footer>
		<v-footer dark padless>
			<v-card flat tile color="transparent" class="text-center" width="100%">
				<v-divider></v-divider>
				<v-card-text>
					{{ new Date().getFullYear() }} — <strong>{{ copy }}</strong>
				</v-card-text>
			</v-card>
		</v-footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import { routeMeta, siteTitle } from '~/utils/constants'

export default {
	data: () => ({
		copy: siteTitle.short
	}),

	computed: {
		...mapState('config', ['infos']),

		sections() {
			return [
				{
					title: routeMeta.INFOS.title,
					links: this.infos.map(info => {
						return {
							title: info.title,
							to: `/${info.full_slug}/`
						}
					})
				},
				{
					title: routeMeta.LINEUP.title,
					links: [
						{ ...routeMeta.LINEUP__BANDS },
						{ ...routeMeta.LINEUP__TIMETABLE }
					]
				},
				{
					title: 'Medien',
					links: [{ ...routeMeta.MEDIEN__FOTOGALERIE }]
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
	}
}
</script>

<style lang="scss" scoped>
.v-list ::v-deep {
	.v-list-item__content > * {
		line-height: 1.4;
	}

	a {
		color: white;
		text-decoration: none;
		font-size: $size15;
	}
}
</style>
