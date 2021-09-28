const countryNames = {
	DE: 'Deutschland',
	CH: 'Schweiz',
	AT: 'Österreich',
	FR: 'Frankreich'
}

const shippingRates = {
	sr350: {
		id: 'shr_1JemHsBfAFuG6uOsEUCxo2lm',
		amount: 350
	},
	sr450: {
		id: 'shr_1JemNZBfAFuG6uOsOmW1BH7i',
		amount: 450
	}
}

const constructProducts = (productsList, pricesList) => {
	if (!productsList) return []

	return productsList.data
		.filter(p => p.active)
		.map(product => {
			let prices = []
			if (pricesList && pricesList.data) {
				prices = pricesList.data.filter(price => price.product === product.id)
			}
			return {
				...product,
				prices
			}
		})
}

const getProducts = async stripe => {
	const productsPromise = stripe.products.list({ limit: 100 })
	const pricesPromise = stripe.prices.list({ limit: 100 })

	const [productsList, pricesList] = await Promise.all([
		productsPromise,
		pricesPromise
	])

	const products = constructProducts(productsList, pricesList)
	return products
}

module.exports = { getProducts, countryNames, shippingRates }
