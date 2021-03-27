import { baseUrl, siteTitle } from './utils/constants'
import { createSEOMeta } from './utils/seo'
import { splashscreens } from './splashes'

// const proxyOptionsDev = {
// 	axiosProxy: false,
// 	rules: {}
// }

// if (process.env.NODE_ENV === 'development') {
// 	proxyOptionsDev.axiosProxy = true
// 	proxyOptionsDev.rules = {
// 		'/api/': {
// 			target: 'http://localhost:8888',
// 			pathRewrite: { '^/api/': '' }
// 		}
// 	}
// }

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
			// { name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				name: 'viewport',
				content:
					'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover'
			},
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
				content: siteTitle.long
			},
			{
				hid: 'og:description',
				name: 'og:description',
				content: siteTitle.long
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				content: siteTitle.long
			}
		],
		link: [
			// { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			...splashscreens
			// { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			// {
			// 	rel: 'stylesheet',
			// 	href:
			// 		'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap'
			// }
		]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['@/assets/style/fonts.scss', '~/assets/style/main.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		'~/plugins/composition-api.js',
		'~/plugins/rich-text-renderer.js',
		{ src: '~/plugins/lightgallery.js', mode: 'client' },
		{ src: '~/plugins/smoothscroll.js', mode: 'client' },
		{ src: '~~/node_modules/vue-rellax/lib/nuxt-plugin', mode: 'client' }
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// [
		// 	'@nuxtjs/html-validator',
		// 	{
		// 		usePrettier: true,
		// 		options: {
		// 			rules: {
		// 				'prefer-native-element': 'off'
		// 			}
		// 		}
		// 	}
		// ],
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
		'@/modules/netlifyFiles',
		'@/modules/socialCardGenerator'
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
		'nuxt-stripejs'
	],

	stripe: {
		publishableKey:
			'pk_test_51IP7XYBfAFuG6uOs5pu8crgpe5Z6OUfreIGvoM6Vdz66XQnGN4H4RR9qoy2uwQv0meyYfxV4YsmAS2ZKbsOrxbTc00CET6X6bc'
	},

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: { proxy: true },

	/*
	 ** Proxy module configuration
	 */
	proxy: {},

	pwa: {
		// workbox: {
		// 	enabled: true
		// },

		icon: {
			iosSizes: []
		},

		manifest: {
			name: siteTitle.short,
			short_name: 'Wolfweez',
			description: siteTitle.long,
			background_color: '#212121',
			theme_color: '#212121', // TODO:
			lang: 'de-DE',
			orientation: 'portrait-primary'
		},

		meta: {
			// will generate "apple-mobile-web-app-capable"
			mobileAppIOS: true,
			// 'black' => black background with white text. 'default' is the opposite
			appleStatusBarStyle: 'black'
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
	build: {
		// analyze: true
		extractCSS: true,

		filenames: {
			app: ({ isDev, isModern }) =>
				isDev
					? `[name]${isModern ? '.modern' : ''}.js`
					: `[name].[contenthash:7]${isModern ? '.modern' : ''}.js`,
			chunk: ({ isDev, isModern }) =>
				isDev
					? `[name]${isModern ? '.modern' : ''}.js`
					: `[name].[contenthash:7]${isModern ? '.modern' : ''}.js`,
			// If extractCSS is true (see above), name the css files:
			css: ({ isDev }) =>
				isDev ? '[name].css' : 'css/[name].[contenthash:7].css'
		},

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}

	// render: {
	// 	bundleRenderer: {
	// 		shouldPreload: (file, type) => {
	// 			if (type === 'font') {
	// 				// only preload woff2 fonts
	// 				return /\.woff2$/.test(file)
	// 			}
	// 		}
	// 	}
	// }
}
