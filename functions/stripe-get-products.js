// NOTE: only gets called in dev or spa mode (mounted)
// NOTE: equivalent is done inside module "stripeProducts"
const stripe = require('stripe')(
	process.env.NUXT_ENV_TEST_MODE === 'true'
		? process.env.STRIPE_SECRET_KEY_TEST
		: process.env.STRIPE_SECRET_KEY_LIVE
)
const StoryblokClient = require('storyblok-js-client')

const sbClient = new StoryblokClient({
	// NOTE: "API_ONLY_STORYBLOK_TOKEN_TEST" is only set in netlify GUI
	accessToken: process.env.API_ONLY_STORYBLOK_TOKEN_TEST
})

const handler = async event => {
	const {
		getProductsAndShippingRates
	} = require('./../utils/stripe-helpers.js')
	let products
	let shippingRates

	try {
		const result = await getProductsAndShippingRates(
			stripe,
			sbClient,
			'draft',
			'true'
		)
		products = result.products
		shippingRates = result.shippingRates
	} catch (error) {
		console.error('❌  get-products:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}

	console.info('ℹ️  stripe-products:', products)
	console.info('ℹ️  stripe-shippingRates:', shippingRates)

	return {
		statusCode: 200,
		body: JSON.stringify({ products, shippingRates })
	}
}

module.exports = { handler }
