const countryNames = {
	DE: 'Deutschland',
	CH: 'Schweiz',
	AT: 'Österreich',
	FR: 'Frankreich'
}

const formatPrice = price => {
	return (
		(price / 100)
			.toFixed(2) // always two decimal digits
			.replace('.', ',') // replace decimal point character with ,
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €' // use . as a separator
	)
}

const getShippingRates = testMode => {
	return {
		sr350: {
			id:
				testMode === 'true'
					? 'shr_1JemHsBfAFuG6uOsEUCxo2lm'
					: 'shr_1JgGLBBfAFuG6uOsMiABGtLE',
			amount: 350
		},
		sr450: {
			id:
				testMode === 'true'
					? 'shr_1JemNZBfAFuG6uOsOmW1BH7i'
					: 'shr_1JgGLMBfAFuG6uOsma0HxiPb',
			amount: 450
		}
	}
}

const constructProducts = (productsList, pricesList, sbTickets, testMode) => {
	if (!productsList) return []

	const productsWithPrices = productsList.data
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

	const sbProductId = testMode === 'true' ? 'stripe_id_test' : 'stripe_id_live'

	const products = productsWithPrices.map(
		({ id, images, metadata, name, prices }) => {
			const price = prices[0]
			let imageSb
			let textSb

			const sbEntryExists = sbTickets.stories.find(
				t => t.content[sbProductId] === id
			)

			if (
				sbEntryExists &&
				sbEntryExists.content.image &&
				sbEntryExists.content.image.filename
			) {
				imageSb = sbEntryExists.content.image
			}

			if (sbEntryExists && sbEntryExists.content.text) {
				textSb = sbEntryExists.content.text
			}

			return {
				productId: id,
				imageStripe: images[0],
				imageSb,
				textSb,
				name,
				extraShipping: metadata['extra-shipping'] === 'yes',
				price: {
					id: price.id,
					currency: price.currency,
					unit_amount: price.unit_amount,
					unit_amount_decimal: price.unit_amount_decimal,
					formatted: formatPrice(price.unit_amount)
				}
			}
		}
	)

	// https://newbedev.com/sort-an-array-of-objects-based-on-another-array-of-ids
	const itemPositions = {}
	for (const [index, id] of sbTickets.stories.entries()) {
		itemPositions[id.content[sbProductId]] = index
	}

	return products.sort(
		(a, b) => itemPositions[a.productId] - itemPositions[b.productId]
	)
}

const getProducts = async (stripe, sbClient, sbVersion, testMode = 'false') => {
	const productsPromise = stripe.products.list({ limit: 100 })
	const pricesPromise = stripe.prices.list({ limit: 100 })
	const sbPromise = sbClient.get('cdn/stories', {
		starts_with: 'tickets/ticket_types/',
		version: sbVersion
	})

	const [productsList, pricesList, { data: sbTickets }] = await Promise.all([
		productsPromise,
		pricesPromise,
		sbPromise
	])

	const products = constructProducts(
		productsList,
		pricesList,
		sbTickets,
		testMode
	)
	return products
}

module.exports = { countryNames, formatPrice, getShippingRates, getProducts }
