<template>
	<div v-editable="band">
		<h1 class="text-h3 text-md-h2 font-weight-bold pb-4">{{ band.name }}</h1>
		<v-row>
			<!-- main -->
			<v-col cols="12" lg="7" xl="8">
				<SbImage
					v-if="band.image && band.image.filename"
					:alt="band.name"
					:pic="band.image"
					:preset="$config.presetNames.BAND_DETAIL"
					:position="$_shiftImagePositionY(band.image_offset)"
				/>
				<div :class="{ 'mt-6': band.image && band.image.filename }">
					<rich-text-renderer
						v-if="band.description"
						:document="band.description"
					/>
				</div>
			</v-col>

			<!-- aside -->
			<v-col cols="12" lg="5" xl="4" tag="aside">
				<v-card color="darkish" flat>
					<v-card-text>
						<h2>Running Order</h2>
						<v-divider />
						<div class="pb-2"><b>Tag:</b> {{ playDay || 'TBA' }}</div>
						<div><b>Zeit:</b> {{ playTime || 'TBA' }}</div>
					</v-card-text>

					<v-card-text v-if="bandLinks.length" class="pt-4 pb-3">
						<h2>Links</h2>
						<v-divider />
						<v-list dense color="transparent" class="py-0 mx-n2">
							<v-list-item
								v-for="(link, linkIndex) in bandLinks"
								:key="`link-${linkIndex}`"
								:href="link.url"
								:ripple="false"
								link
								target="_blank"
								rel="noopener noreferrer"
								class="px-2 rounded"
							>
								<v-list-item-icon class="align-self-center mr-3">
									<v-icon color="prime" v-text="link.icon"></v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									{{ link.label }}
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'BandDetail',
	mixins: [useFormatting],

	props: {
		band: {
			type: Object,
			required: true
		},
		playDay: {
			type: String,
			default: ''
		},
		playTime: {
			type: String,
			default: ''
		}
	},

	computed: {
		bandLinks() {
			const links = []

			if (this.band.link_website) {
				links.push({
					icon: '$compass',
					label: 'Offizielle Website',
					url: this.band.link_website
				})
			}
			if (this.band.link_facebook) {
				links.push({
					icon: '$facebook',
					label: 'Facebook',
					url: this.band.link_facebook
				})
			}
			if (this.band.link_instagram) {
				links.push({
					icon: '$instagram',
					label: 'Instagram',
					url: this.band.link_instagram
				})
			}
			if (this.band.link_twitter) {
				links.push({
					icon: '$twitter',
					label: 'Twitter',
					url: this.band.link_twitter
				})
			}
			if (this.band.link_youtube) {
				links.push({
					icon: '$youtube',
					label: 'Youtube',
					url: this.band.link_youtube
				})
			}

			return links
		}
	}
}
</script>

<style lang="scss" scoped>
.v-card__text {
	h2 {
		color: getcolor('bright', 0.6);
		font-size: $size15;
		text-transform: uppercase;
		padding-bottom: 3px;
	}

	hr {
		padding-bottom: 10px;
	}
}

.v-list-item--link {
	color: getcolor('bright', 0.85) !important;

	&::before {
		border-radius: $border-radius-root;
	}
}
</style>
