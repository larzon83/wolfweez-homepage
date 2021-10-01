// NOTE: equivalent is done inside fn "stripe-get-products" when in dev or spa mode
const { resolve } = require('path')
const { getProducts } = require('../../utils/stripe-helpers.js')

export default function () {
	this.nuxt.hook('build:before', async context => {
		const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		const StoryblokClient = require('storyblok-js-client')

		const sbClient = new StoryblokClient({
			accessToken: process.env.STORYBLOK_TOKEN
		})

		const sbVersion =
			process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true' ? 'draft' : 'published'

		const testMode =
			process.env.NODE_ENV === 'development' ||
			process.env.NUXT_ENV_IS_SPA === 'true'
				? 'true'
				: 'false'

		const products = await getProducts(stripe, sbClient, sbVersion, testMode)

		console.info('ℹ️  stripe-products(module):', products)

		this.addPlugin({
			src: resolve(__dirname, 'plugin.js'),
			fileName: 'stripe-products-plugin.js',
			options: {
				products
			}
		})
	})
}

module.exports.meta = require('./package.json')
