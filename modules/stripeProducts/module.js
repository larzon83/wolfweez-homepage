// NOTE: equivalent is done inside fn "stripe-get-products" when in dev or spa mode
const { resolve } = require('path')
const { getProductsAndShippingRates } = require('../../utils/stripe-helpers.js')

export default function () {
	this.nuxt.hook('build:before', async context => {
		const stripe = require('stripe')(
			process.env.NUXT_ENV_TEST_MODE === 'true'
				? process.env.STRIPE_SECRET_KEY_TEST
				: process.env.STRIPE_SECRET_KEY_LIVE
		)
		const StoryblokClient = require('storyblok-js-client')

		const sbClient = new StoryblokClient({
			accessToken: process.env.STORYBLOK_TOKEN
		})

		const sbVersion =
			process.env.NUXT_ENV_STORYBLOK_PREVIEW === 'true' ? 'draft' : 'published'

		const testMode =
			process.env.NUXT_ENV_TEST_MODE === 'true' ? 'true' : 'false'

		const result = await getProductsAndShippingRates(
			stripe,
			sbClient,
			sbVersion,
			testMode
		)

		const { products, shippingRates } = result

		console.info('ℹ️  stripe-products(module):', products)
		console.info('ℹ️  stripe-shippingRates(module):', shippingRates)

		this.addPlugin({
			src: resolve(__dirname, 'plugin.js'),
			fileName: 'stripe-products-plugin.js',
			options: {
				products,
				shippingRates
			}
		})
	})
}

module.exports.meta = require('./package.json')
