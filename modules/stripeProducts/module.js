const { resolve } = require('path')
const { getProducts } = require('../../utils/stripe-helpers.js')

export default function () {
	this.nuxt.hook('build:before', async context => {
		const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
		const products = await getProducts(stripe)

		console.info('stripe-products:', products)

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
