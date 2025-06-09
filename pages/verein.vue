<template>
	<section v-editable="story.content">
		<div
			v-if="story.content.image && story.content.image.filename"
			class="px-md-5 pb-5"
		>
			<SbImage
				:alt="story.content.image.alt || ''"
				:pic="story.content.image"
				:preset="$config.presetNames.NEWS_DETAIL"
			/>
			<small
				v-if="story.content.image.title"
				style="opacity: 0.4"
				class="d-block mt-2"
				><i>{{ story.content.image.title }}</i></small
			>
		</div>

		<h1
			class="d-none d-lg-flex text-h4 text-sm-h3 text-lg-h2 font-weight-bold pb-4"
		>
			{{ pageTitle }}
		</h1>

		<rich-text-renderer
			v-if="story.content.text"
			:document="story.content.text"
		/>

		<v-card color="darkish" flat class="mt-10 mb-12">
			<v-card-text>
				<v-row align="center" class="flex-column flex-md-row">
					<v-col cols="auto">
						<v-img
							alt="Logo Musikinitiative Irslingen 2019 e.V."
							:aspect-ratio="945 / 990"
							:src="require('~/assets/img/mii-logo.svg')"
							contain
							width="120"
						/>
					</v-col>
					<v-col class="text-center text-md-left">
						<h2>Musikinitiative Irslingen 2019 e.V.</h2>
						<p class="mb-1">
							<a href="/mii-mitgliedsantrag-2023.pdf" target="_blank"
								>Hier geht's zur Mitgliedschaft<v-icon
									size="15"
									class="ml-2 ahref--text"
									>$externalLink</v-icon
								></a
							>
						</p>
						<p>
							<a href="/mii-satzung.pdf" target="_blank"
								>Satzung der M.I.I.<v-icon size="15" class="ml-2 ahref--text"
									>$externalLink</v-icon
								></a
							>
						</p>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>

		<template v-if="story.content.gallery && story.content.gallery[0]">
			<SbImage
				:pic="story.content.gallery[0]"
				:preset="$config.presetNames.FULL_WIDTH"
				class="rounded"
			/>
			<small
				v-if="story.content.gallery[0].title"
				style="opacity: 0.4"
				class="d-block mt-2"
				><i>{{ story.content.gallery[0].title }}</i></small
			>
		</template>
	</section>
</template>

<script>
import useStorybridge from 'storybridgeMixin/useStorybridge.js'
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createSEOMeta } from '~/utils/seo'

export default {
	name: 'DerVerein',
	mixins: [savePagetitleToVuex, useFormatting, useStorybridge],

	head() {
		const title = this.pageTitle

		const { image, imageHeight } = this.$_generateOgImageEntry(
			this.story.content.image_social?.filename,
			this.$route.path
		)

		return {
			title,
			meta: createSEOMeta({
				description: this.story.content.description_meta,
				image,
				imageAlt: title,
				imageHeight,
				title,
				url: this.$route.path
			})
		}
	},

	async asyncData(context) {
		const result = await sbData({
			ctx: context,
			path: '/verein'
		})
		console.log('result:', result.story.content.image)

		const crumbs = [
			{
				title: result?.story.content.headline || routeMeta.VEREIN.title,
				to: routeMeta.VEREIN.to
			}
		]
		context.store.commit('central/SET_CRUMBS', crumbs)

		return { ...result }
	},

	computed: {
		pageTitle() {
			return this.story?.content.headline || routeMeta.VEREIN.title
		}
	}
}
</script>

<style lang="scss" scoped></style>
