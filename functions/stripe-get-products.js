const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async event => {
	const { getProducts } = require('./../utils/stripe-helpers.js')

	try {
		const products = await getProducts(stripe)
		console.info('stripe-products:', products)
		return {
			statusCode: 200,
			body: JSON.stringify(products)
		}
	} catch (error) {
		console.error('get-products:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}
}

module.exports = { handler }
