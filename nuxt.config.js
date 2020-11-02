import { baseUrl, siteTitle } from './utils/constants'
import { createSEOMeta } from './utils/seo'

export default {
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
		'~/plugins/sb-config.js',
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
		// '@/modules/sbConfig',
		'@/modules/netlifyTomlUpdater',
		'@/modules/socialCardGenerator'
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios'
		// https://go.nuxtjs.dev/content
		// '@nuxt/content'
	],

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {},

	pwa: {
		manifest: {
			name: siteTitle.short,
			short_name: 'Wolfweez',
			description: 'description description description', // TODO:
			background_color: '#202020',
			theme_color: '#000', // TODO:
			lang: 'de-DE',
			orientation: 'portrait-primary'
		}
	},

	// Content module configuration (https://go.nuxtjs.dev/content-config)
	// content: {},

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

	router: {
		middleware: 'setConfig',
		trailingSlash: process.env.NUXT_ENV_IS_SPA === 'true' ? undefined : true
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {}
}
