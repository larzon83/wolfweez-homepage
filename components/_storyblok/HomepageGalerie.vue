<template>
	<v-card
		v-if="latestGallery"
		v-editable="pageBlok"
		color="darkish"
		flat
		class="mt-16"
	>
		<v-card-text>
			<ImgGalleries
				:galleries="[latestGallery]"
				:max-pics-to-show="6"
				:headline="`Bilder vom Festival ${latestGallery.year}`"
				padding-top-override="pt-1"
				padding-bottom-override="pb-5"
				cols-lg="2"
			/>
			<v-row align="center" justify="center" no-gutters class="mt-6">
				<v-btn
					:ripple="false"
					min-width="190"
					color="ahref"
					large
					outlined
					role="link"
					class="btn-more"
					:to="fotogalerieRoute"
				>
					Mehr Bilder<v-icon right size="15" color="prime">$arrowRight</v-icon>
				</v-btn>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { routeMeta } from '~/utils/constants'

export default {
	name: 'HomepageGalerie',
	props: {
		pageBlok: {
			type: Object,
			required: true
		}
	},

	computed: {
		...mapGetters(['latestGallery'])
	},

	created() {
		this.fotogalerieRoute = routeMeta.MEDIEN__FOTOGALERIE.to
	}
}
</script>

<style lang="scss" scoped>
.btn-more {
	background-color: getcolor('prime', 0.12);
	border-width: 3px;
}
</style>
