<template>
	<!-- eslint-disable vue/no-v-html -->
	<div v-editable="content">
		<h2 v-if="content.title" class="pb-3">{{ content.title }}</h2>
		<v-row class="flex-column-reverse flex-lg-row">
			<v-col cols="12" lg="6">
				<template v-for="(blok, index) in content.bloks">
					<rich-text-renderer
						v-if="blok.text"
						:key="`blok-map-${blok._uid}`"
						:document="blok.text"
					/>
					<v-divider
						v-if="index !== content.bloks.length - 1"
						:key="`blok-map-divider-${index}`"
						class="mt-8 mt-md-10 pb-8 pb-md-10"
					/>
				</template>
			</v-col>
			<v-col cols="12" lg="6">
				<v-responsive v-if="content.iframe" aspect-ratio="1" class="map">
					<div
						v-if="content.iframe"
						style="height: 100%"
						v-html="content.iframe"
					/>
				</v-responsive>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'BlokMap',
	props: {
		content: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.map ::v-deep iframe {
	width: 100%;
	height: 100%;
}
</style>
