const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { products, shippingRates } = options

export default ({ app }, inject) => {
	inject('stripeProducts', products)
	inject('stripeShippingRates', shippingRates)
}
