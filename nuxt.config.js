import StoryblokClient from 'storyblok-js-client'
import { baseUrl, siteTitle } from './utils/constants'
import { createSEOMeta } from './utils/seo'

export default async function () {
	const client = new StoryblokClient({
		accessToken: process.env.STORYBLOK_TOKEN
	})

	// Storyblok: get main festival-config -> extract main meta-description
	const { data } = await client.get('cdn/stories/config', {
		version:
			process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true' ? 'draft' : 'published'
	})

	const defaultMetaDescription =
		data.story.content.description_meta || siteTitle.long

	// Storyblok: get all history years -> most recend one will be used in netlify redirects
	const { data: sbHistoryYears } = await client.get('cdn/stories', {
		starts_with: 'historie/',
		is_startpage: 1,
		sort_by: 'slug:desc'
	})

	const netlifyRedirects = [
		{
			from: '/line-up/',
			to: '/line-up/bands/',
			force: true
		},
		{
			from: '/historie/',
			to: `/historie/${sbHistoryYears.stories[0].slug}/`,
			force: true
		}
	]

	if (process.env.NUXT_ENV_IS_SPA === 'true') {
		netlifyRedirects.push({
			from: '/*',
			to: '/index.html',
			status: 200
		})
	}

	return {
		ssr: process.env.NUXT_ENV_IS_SPA !== 'true',
		target: process.env.NUXT_ENV_IS_SPA === 'true' ? 'server' : 'static',

		// serverMiddleware: ['~/server-middleware/log.js'],

		// Global page headers (https://go.nuxtjs.dev/config-head)
		head: {
			titleTemplate: `%s - ${siteTitle.short}`,
			title: siteTitle.long,
			meta: [
				...createSEOMeta(),
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'og:site_name',
					property: 'og:site_name',
					content: siteTitle.short
				},
				// { hid: 'twitter:site', name: 'twitter:site', content: '@bobross' },
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary_large_image'
				},
				// default and fallback descriptions:
				{
					hid: 'description',
					name: 'description',
					content: defaultMetaDescription
				},
				{
					hid: 'og:description',
					name: 'og:description',
					content: defaultMetaDescription
				},
				{
					hid: 'twitter:description',
					name: 'twitter:description',
					content: defaultMetaDescription
				}
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				// {
				// 	rel: 'stylesheet',
				// 	href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600'
				// }
				{
					rel: 'stylesheet',
					href:
						'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
				}
			]
		},

		// Global CSS (https://go.nuxtjs.dev/config-css)
		css: ['~/assets/style/main.scss'],

		// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
		plugins: [
			'~/plugins/composition-api.js',
			'~/plugins/rich-text-renderer.js'
		],

		// Auto import components (https://go.nuxtjs.dev/config-components)
		components: true,

		// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
		buildModules: [
			'@nuxtjs/eslint-module',
			'@nuxtjs/pwa',
			'@nuxtjs/vuetify',
			[
				'storyblok-nuxt',
				{
					accessToken: process.env.STORYBLOK_TOKEN,
					cacheProvider: 'memory'
				}
			],
			['nuxt-canonical', { baseUrl }],
			// '@/modules/netlifyFilesGenerator',
			'@aceforth/nuxt-netlify',
			'@/modules/socialCardGenerator'
		],

		// Modules (https://go.nuxtjs.dev/config-modules)
		modules: [
			// https://go.nuxtjs.dev/axios
			'@nuxtjs/axios'
		],

		netlify: {
			mergeSecurityHeaders: false, // to be able to override X-Frame-Options
			redirects: netlifyRedirects,
			headers: {
				'/*': [
					// default headers, the module sets
					'Referrer-Policy: origin',
					'X-Content-Type-Options: nosniff',
					'X-XSS-Protection: 1; mode=block',
					// custom X-Frame-Options
					'X-Frame-Options: ALLOW-FROM https://app.storyblok.com/',
					// other custom headers
					'Content-Security-Policy: frame-ancestors https://app.storyblok.com'
				]
			}
		},

		// Axios module configuration (https://go.nuxtjs.dev/config-axios)
		axios: {},

		pwa: {
			manifest: {
				name: siteTitle.short,
				short_name: 'Wolfweez',
				description: defaultMetaDescription,
				background_color: '#202020',
				theme_color: '#000', // TODO:
				lang: 'de-DE',
				orientation: 'portrait-primary'
			}
		},

		// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
		vuetify: {
			customVariables: ['~/assets/style/variables.scss'],
			optionsPath: './config/vuetify.options.js',
			treeShake: true,
			defaultAssets: false
			// defaultAssets: {
			// 	font: false
			// 	// icons: 'md'
			// }
		},

		generate: {
			fallback: process.env.NUXT_ENV_IS_SPA === 'true' ? '200.html' : true
		},

		router: {
			middleware: 'setConfig',
			trailingSlash:
				process.env.NUXT_ENV_IS_SPA === 'true' ||
				process.env.NODE_ENV === 'development'
					? undefined
					: true
		},

		// Build Configuration (https://go.nuxtjs.dev/config-build)
		build: {}
	}
}
