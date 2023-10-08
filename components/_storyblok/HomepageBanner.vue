<template>
	<v-row
		v-if="pageBlok.url && pageBlok.image && pageBlok.image.filename"
		v-editable="pageBlok"
		class="mt-9"
	>
		<v-col cols="12">
			<template v-if="!pageBlok.url.url && !pageBlok.url.story">
				<SbImage
					v-if="pageBlok.image && pageBlok.image.filename"
					:alt="pageBlok.alt"
					:pic="pageBlok.image"
					:preset="$config.presetNames.FULL_WIDTH"
				/>
			</template>
			<a
				v-else-if="pageBlok.url.url"
				:href="pageBlok.url.url"
				rel="noreferrer"
				:target="pageBlok.url_target_self ? undefined : '_blank'"
			>
				<SbImage
					v-if="pageBlok.image && pageBlok.image.filename"
					:alt="pageBlok.alt"
					:pic="pageBlok.image"
					:preset="$config.presetNames.FULL_WIDTH"
			/></a>
			<nuxt-link
				v-else-if="pageBlok.url.story && pageBlok.url.story.full_slug"
				:to="$_slashify(pageBlok.url.story.full_slug)"
			>
				<SbImage
					v-if="pageBlok.image && pageBlok.image.filename"
					:alt="pageBlok.alt"
					:pic="pageBlok.image"
					:preset="$config.presetNames.FULL_WIDTH"
				/>
			</nuxt-link>
		</v-col>
	</v-row>
</template>

<script>
import useFormatting from '~/mixins/useFormatting.js'

export default {
	name: 'HomepageBanner',
	mixins: [useFormatting],
	props: {
		pageBlok: {
			type: Object,
			required: true
		}
	}
}
</script>
