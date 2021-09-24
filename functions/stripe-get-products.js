const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async event => {
	const { constructProducts } = require('./../utils/stripe-helpers.js')

	try {
		const productsPromise = stripe.products.list({ limit: 100 })
		const pricesPromise = stripe.prices.list({ limit: 100 })

		const [productsList, pricesList] = await Promise.all([
			productsPromise,
			pricesPromise
		])

		const products = constructProducts(productsList, pricesList)

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
