// NOTE: only gets called in dev or spa mode (mounted)
// NOTE: equivalent is done inside module "stripeProducts"
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const StoryblokClient = require('storyblok-js-client')

const sbClient = new StoryblokClient({
	// NOTE: "STORYBLOK_PREVIEW_TOKEN" is only set in netlify GUI
	accessToken: process.env.STORYBLOK_PREVIEW_TOKEN
})

const handler = async event => {
	const { getProducts } = require('./../utils/stripe-helpers.js')
	let products

	try {
		products = await getProducts(stripe, sbClient, 'draft', 'true')
	} catch (error) {
		console.error('❌  get-products:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}

	console.info('ℹ️  stripe-products:', products)

	return {
		statusCode: 200,
		body: JSON.stringify(products)
	}
}

module.exports = { handler }
