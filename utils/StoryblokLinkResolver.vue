<template>
	<router-link v-if="linkType === 'story'" :target="target" :to="href + '/'">
		<slot />
	</router-link>
	<a v-else-if="linkType === 'email'" :href="`mailto:${href}`"><slot /></a>
	<a v-else :href="href" :target="target" rel="noreferrer"><slot /></a>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
// import { LinkAttributes } from '@marvr/storyblok-rich-text-types';

export default defineComponent({
	name: 'SbLink',
	props: {
		attrs: {
			type: Object,
			required: true
		}
	},
	// eslint-disable-next-line vue/no-setup-props-destructure
	setup({ attrs }) {
		const linkType = ref(attrs.linktype)
		const href = ref(attrs.href)
		const target = ref(attrs.target)

		return {
			linkType,
			href,
			target
		}
	}
})
</script>
