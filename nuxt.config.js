export default {
	// Target (https://go.nuxtjs.dev/config-target)
	target: 'static',
	// target: 'server',

	// serverMiddleware: ['~/server-middleware/log.js'],

	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: '%s - ww-test',
		title: 'ww-test',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'bla bla bla' }
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
	plugins: [],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify'
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
			name: 'WW',
			short_name: 'WW',
			description: 'WW Test site',
			background_color: '#000',
			theme_color: '#000',
			lang: 'de-DE',
			orientation: 'portrait-primary'
		}
	},

	// Content module configuration (https://go.nuxtjs.dev/content-config)
	// content: {},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		optionsPath: './config/vuetify.options.js',
		treeShake: true,
		defaultAssets: false
		// defaultAssets: {
		// 	font: false
		// 	// icons: 'md'
		// }
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {}
}
