const constructProducts = (productsList, pricesList) => {
	if (!productsList) return []

	return productsList.data.map(product => {
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

const countryNames = {
	DE: 'Deutschland',
	CH: 'Schweiz',
	AT: 'Österreich'
}

module.exports = { constructProducts, countryNames }
