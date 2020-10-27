import Vue from 'vue'
import { Mark } from '@marvr/storyblok-rich-text-types'
import VueRichTextRenderer from '@marvr/storyblok-rich-text-vue-renderer'
import StoryblokLinkResolver from '../utils/StoryblokLinkResolver.vue'

Vue.use(VueRichTextRenderer, {
	resolvers: {
		marks: {
			[Mark.LINK]: StoryblokLinkResolver
		}
	}
})
