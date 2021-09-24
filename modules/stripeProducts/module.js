const { resolve } = require('path')
const { constructProducts } = require('../../utils/stripe-helpers.js')

export default function () {
	this.nuxt.hook('build:before', async context => {
		const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

		const productsPromise = stripe.products.list({ limit: 100 })
		const pricesPromise = stripe.prices.list({ limit: 100 })

		const [productsList, pricesList] = await Promise.all([
			productsPromise,
			pricesPromise
		])

		const products = constructProducts(productsList, pricesList)

		console.info('products:', products)

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
