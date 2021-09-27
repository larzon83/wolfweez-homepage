const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async event => {
	const { getProducts } = require('./../utils/stripe-helpers.js')
	let products

	try {
		products = await getProducts(stripe)
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
