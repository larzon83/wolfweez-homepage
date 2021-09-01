import { resolve } from 'path'
import { baseUrl, siteDescription, siteTitle } from './utils/constants'
import { aspectRatios, presetNames } from './utils/responsive-images'
import { createSEOMeta } from './utils/seo'
import { splashscreens } from './splashes'
import colors from './assets/style/colors.json'

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

	publicRuntimeConfig: {
		aspectRatios,
		presetNames,
		siteTitle
	},

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: `%s - ${siteTitle.short}`,
		title: siteTitle.long,
		meta: [
			...createSEOMeta(),
			{ hid: 'charset', charset: 'utf-8' },
			{
				name: 'viewport',
				content:
					'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, minimal-ui, viewport-fit=cover'
			},
			// pwa.meta.mobileAppIOS set to false, therefor set this manually
			// https://github.com/nuxt-community/pwa-module/issues/443
			{
				hid: 'apple-mobile-web-app-capable',
				name: 'apple-mobile-web-app-capable',
				content: 'yes'
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
				content: siteDescription
			},
			{
				hid: 'og:description',
				name: 'og:description',
				content: siteDescription
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				content: siteDescription
			}
		],
		link: [
			// { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			...splashscreens,
			{ rel: 'preconnect', href: 'https://a.storyblok.com' },
			{ rel: 'preconnect', href: 'https://img2.storyblok.com' }
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

	// TODO: how to get watch working to trigger "vuetifyAdditionalVars" module?
	watch: ['~/config/**/font-sizes.js'],

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
		'@/modules/vuetifyAdditionalVars',
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
		'nuxt-client-init-module',
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
			description: siteDescription,
			background_color: colors.clientcolors.dark,
			theme_color: colors.clientcolors.dark,
			lang: 'de-DE',
			orientation: 'portrait-primary'
		},

		meta: {
			// don't make mobileAppIOS true, because pwa-module will then produce wrong splashscreens (at all)
			// mobileAppIOS is (normally) responsible to produce "apple-mobile-web-app-capable" meta-tag -> has to be set manually, see above
			// https://github.com/nuxt-community/pwa-module/issues/443
			// mobileAppIOS: true,
			// 'black' => black background with white text. 'default' is the opposite
			appleStatusBarStyle: 'black'
		},

		workbox: {
			skipWaiting: false,
			runtimeCaching: [
				{
					urlPattern: 'https://img2.storyblok.com/.*',
					handler: 'StaleWhileRevalidate'
				}
			]
		}
	},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
	vuetify: {
		customVariables: ['~/assets/style/variables.scss'],
		optionsPath: './config/vuetify.options.js',
		treeShake: true,
		defaultAssets: false
	},

	generate: {
		fallback: process.env.NUXT_ENV_IS_SPA === 'true' ? '200.html' : true
	},

	router: {
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
		extend(config, ctx) {
			config.module.rules.push({
				test: /\.scss$/,
				loader: '@epegzz/sass-vars-loader',
				exclude: /(node_modules)/,
				options: {
					syntax: 'scss',
					files: [
						resolve(__dirname, './assets/style/colors.json'),
						resolve(__dirname, `./config/font-sizes.js`),
						resolve(__dirname, './assets/style/_functions.scss'),
						resolve(__dirname, './assets/style/_mixins.scss')
					]
				}
			})
		}
	},

	render: {
		bundleRenderer: {
			shouldPreload: (file, type) => {
				if (type === 'style') {
					return true
				}
				if (type === 'font') {
					// only preload woff2 fonts
					return /\.woff2$/.test(file)
				}
				if (type === 'image') {
					// only preload important images
					return /img\/trees.*svg/.test(file) || /img\/bg.*svg/.test(file)
				}
			}
		}
	}
}
