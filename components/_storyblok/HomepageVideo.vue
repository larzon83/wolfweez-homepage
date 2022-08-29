<template>
	<v-row v-if="pageBlok.url" v-editable="pageBlok" class="mt-9">
		<v-col cols="12">
			<h2 v-if="pageBlok.headline" class="pb-3">{{ pageBlok.headline }}</h2>
			<v-responsive v-if="pageBlok.url" :aspect-ratio="16 / 9">
				<v-lazy v-model="youtubeVisible">
					<LazyYoutubeVideo
						:src="`https://www.youtube.com/embed/${pageBlok.url}`"
						alt="Video thumbnail"
						button-label="Video abspielen"
					/>
				</v-lazy>
			</v-responsive>
		</v-col>
	</v-row>
</template>

<script>
import 'vue-lazy-youtube-video/dist/style.min.css'
import LazyYoutubeVideo from 'vue-lazy-youtube-video'

export default {
	name: 'HomepageVideo',
	components: {
		LazyYoutubeVideo
	},
	props: {
		pageBlok: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			youtubeVisible: false
		}
	}
}
</script>

<style lang="scss" scoped>
.v-responsive {
	border-radius: $border-radius-root;
	border: 3px solid getcolor('prime');
}
</style>
