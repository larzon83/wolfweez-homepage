const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { products } = options

export default ({ app }, inject) => {
	inject('stripeProducts', products)
}
