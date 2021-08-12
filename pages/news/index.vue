<template>
	<v-row class="mt-0">
		<v-col
			v-for="news in newsSorted"
			:key="news.content._uid"
			cols="12"
			lg="6"
			xl="4"
		>
			<v-card
				v-if="news.content"
				:ripple="false"
				:to="$_slashify(news.full_slug)"
				color="darkish"
				flat
				height="100%"
				href
				nuxt
				class="news-card"
			>
				<v-img
					v-if="news.content.image.filename"
					:alt="news.content.headline"
					:src="news.content.image.filename"
					:lazy-src="$_transformImage(news.content.image.filename, '300x0')"
					:aspect-ratio="1.9047619"
					eager
				/>
				<LazyNewsFallbackImage v-else />

				<v-card-subtitle class="news-date pb-0">
					{{ news.newsDate }}
				</v-card-subtitle>
				<v-card-title class="text-h6 news-title pt-0 pb-4">
					{{ news.content.headline }}
				</v-card-title>
				<v-card-text>
					<rich-text-renderer
						v-if="news.content.description_short"
						:document="news.content.description_short"
					/>
					<!-- TODO: -->
					<!-- <rich-text-renderer
							v-else-if="news.content.description"
							:document="news.content.description"
						/> -->
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script>
import savePagetitleToVuex from '~/mixins/savePagetitleToVuex.js'
import useFormatting from '~/mixins/useFormatting.js'
import { getNiceDate, sbData } from '~/utils'
import { routeMeta } from '~/utils/constants'
import { createOgImagePath, createSEOMeta } from '~/utils/seo'

const pageTitle = routeMeta.NEWS.title

export default {
	name: 'NewsOverview',
	mixins: [savePagetitleToVuex, useFormatting],

	head() {
		const title = pageTitle
		return {
			title,
			meta: createSEOMeta({
				description: this.metaDescription || title,
				image: createOgImagePath(this.$route.path),
				imageAlt: title,
				title,
				url: this.$route.path
			})
		}
	},

	data() {
		return {
			pageTitle
		}
	},

	async asyncData(context) {
		const newsDir = await sbData({
			ctx: context,
			startsWith: 'news/'
		})

		const newsMeta = newsDir.stories.find(item => {
			return item.is_startpage
		})

		const newsAll = newsDir.stories
			.filter(item => !item.is_startpage)
			.map(item => {
				let newsDate = item.created_at
				if (item.content?.custom_date) {
					newsDate = item.content.custom_date.replace(' ', 'T') + ':00.000Z'
				} else if (item.first_published_at) {
					newsDate = item.first_published_at
				}
				return {
					...item,
					newsDate: getNiceDate(newsDate),
					newsDateTimestamp: new Date(newsDate).getTime()
				}
			})

		const newsSorted = newsAll.sort((a, b) => {
			if (a.newsDateTimestamp < b.newsDateTimestamp) return 1
			if (a.newsDateTimestamp > b.newsDateTimestamp) return -1
			return 0
		})

		return {
			newsSorted,
			metaDescription: newsMeta?.content?.description_meta
		}
	},

	middleware({ store }) {
		const crumbs = [{ ...routeMeta.NEWS }]
		store.commit('central/SET_CRUMBS', crumbs)
	}
}
</script>

<style lang="scss" scoped>
@import '~/assets/style/__partials/_news.scss';

.news-card {
	transition: transform 300ms;

	&::before {
		border-radius: $border-radius-root;
	}

	@media (hover: hover) {
		&:hover::before {
			opacity: 0.08;
		}
		@media #{map-get($display-breakpoints, 'lg-and-up')} {
			&:hover {
				transform: scale(1.02);
			}
		}
	}

	.news-title {
		font-weight: 700;
		line-height: 2.25rem; // 36px
		word-break: normal;

		text-decoration: underline;
		text-decoration-color: getcolor('prime');
		text-decoration-skip: none;
		text-decoration-skip-ink: none;
		text-decoration-thickness: 5px;
	}
}
</style>
