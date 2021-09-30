import { resolve, join } from 'path'
import { move, readdirSync, unlink } from 'fs-extra'
import { baseUrl, siteDescription, siteTitle } from './utils/constants'
import { aspectRatios, presetNames } from './utils/responsive-images'
import { createSEOMeta } from './utils/seo'
import { splashscreens } from './splashes'
import colors from './assets/style/colors.json'

const purgeWhitelistPatterns = [
	/^v-((?!application).)*$/,
	/^\.theme--dark*/,
	// /^theme--*/,
	/.*-transition/,
	/offset-*/,
	/col-*/,
	/row-*/,
	/align-*/,
	/align-self-*/,
	/justify-*/,
	/justify-self*/,
	/flex-*/,
	/--text$/,
	/^flip-card*/,
	/^lg-*/
]

if (process.env.NODE_ENV === 'development') {
	purgeWhitelistPatterns.push(/p*-[0-9]/, /m*-[0-9]/, /p*-n[0-9]/, /m*-n[0-9]/)
}

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
	watch: ['~/config/**/font-sizes.js', '~/modules/storybridgeMixin/**'],

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
		'@/modules/stripeProducts',
		'@/modules/storybridgeMixin',
		'@/modules/vuetifyAdditionalVars',
		'@nuxtjs/eslint-module',
		'@nuxtjs/pwa',
		'@nuxtjs/vuetify',
		'nuxt-purgecss',
		[
			'storyblok-nuxt',
			{
				accessToken: process.env.STORYBLOK_TOKEN,
				cacheProvider: 'memory'
			}
		],
		['nuxt-canonical', { baseUrl }],
		'@/modules/netlifyFiles'
		// '@/modules/socialCardGenerator'
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: ['nuxt-client-init-module', '@nuxtjs/axios', '@nuxtjs/proxy'],

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: { proxy: true },

	/*
	 ** Proxy module configuration
	 */
	proxy: {},

	pwa: {
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
			// enabled: true,
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

	hooks: {
		generate: {
			distCopied(builder) {
				let toDelete = 'robotsDev.txt'
				let toCopy = 'robotsProd.txt'

				if (
					process.env.NODE_ENV === 'development' ||
					process.env.NUXT_ENV_IS_SPA === 'true' ||
					process.env.NUXT_ENV_STORYBLOK_PREVIEW !== 'true'
				) {
					toDelete = 'robotsProd.txt'
					toCopy = 'robotsDev.txt'
				}

				readdirSync(builder.options.generate.dir, { withFileTypes: true })
					.filter(item => !item.isDirectory())
					.filter(item => item.name === toCopy || item.name === toDelete)
					.forEach(item => {
						if (item.name === toDelete) {
							unlink(join(builder.options.generate.dir, item.name), err => {
								if (err) throw err
							})
						} else if (item.name === toCopy) {
							const oldFile = join(builder.options.generate.dir, item.name)
							const newFile = join(builder.options.generate.dir, 'robots.txt')
							move(oldFile, newFile, err => {
								if (err) throw err
							})
						}
					})
			}
		}
	},

	router: {
		trailingSlash:
			process.env.NUXT_ENV_IS_SPA === 'true' ||
			process.env.NODE_ENV === 'development'
				? undefined
				: true
	},

	purgeCSS: {
		enabled: true,
		paths: [
			// 'node_modules/@nuxtjs/vuetify/**/*.ts',
			// 'node_modules/@nuxt/vue-app/template/**/*.html',
			// 'node_modules/@nuxt/vue-app/template/**/*.vue',
			'node_modules/vuetify/src/**/*.ts'
		],
		whitelist: [
			'v-application',
			'v-application--wrap',
			'nuxt__build_indicator',
			'flip-clock',
			'd-md-none',
			'text-md-left'
		],
		whitelistPatterns: purgeWhitelistPatterns,
		// whitelistPatterns: () => [
		// /.../
		// ],
		whitelistPatternsChildren: [/^v-((?!application).)*$/, /^theme--dark*/]
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		// analyze: true
		extractCSS: true,

		postcss: {
			plugins: {
				'css-byebye': {
					rulesToRemove: [
						/.*\.v-application--is-rtl.*/,
						/.*\.theme--light.*/,
						/.*--shaped.*/
					]
				}
			}
		},

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
