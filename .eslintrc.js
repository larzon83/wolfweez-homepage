module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		'jest/globals': true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: [
		'@nuxtjs',
		'prettier',
		'plugin:nuxt/recommended',
		'plugin:prettier/recommended'
	],
	plugins: ['jest'],
	// add your custom rules here
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

		/*
		 ** Order in components:
		 ** - put head() above data()
		 ** - put fetch() and asyncData after data()
		 ** Original rule here: https://github.com/vuejs/eslint-plugin-vue/blob/master/lib/rules/order-in-components.js
		 */
		'vue/order-in-components': [
			'warn',
			{
				order: [
					'el',
					'name',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					'inheritAttrs',
					'head',
					'model',
					['props', 'propsData'],
					'data',
					'fetch',
					'asyncData',
					'computed',
					'watch',
					'LIFECYCLE_HOOKS',
					'methods',
					['template', 'render'],
					'renderError'
				]
			}
		]
	}
}
