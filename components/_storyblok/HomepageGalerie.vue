<template>
	<div v-if="latestGallery" v-editable="pageBlok" class="mt-16 mt-lg-4">
		<ImgGalleries
			:galleries="[latestGallery]"
			:max-pics-to-show="6"
			cols-lg="2"
		/>
		<v-row align="center" justify="center" no-gutters class="mt-6">
			<v-btn
				:ripple="false"
				min-width="190"
				color="bright"
				large
				light
				tile
				role="link"
				:to="fotogalerieRoute"
			>
				Mehr Bilder
			</v-btn>
		</v-row>
	</div>
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
