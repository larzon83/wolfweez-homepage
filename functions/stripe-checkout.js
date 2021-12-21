// Inspiration:
// Mainly from here: https://github.com/stripe-samples/checkout-netlify-serverless
// also:
// https://github.com/stripe-samples/accept-a-payment
// and almost the same:
// https://github.com/stripe-samples/checkout-one-time-payments

const stripe = require('stripe')(
	process.env.NUXT_ENV_TEST_MODE === 'true'
		? process.env.STRIPE_SECRET_KEY_TEST
		: process.env.STRIPE_SECRET_KEY_LIVE
)
const SITE_URL = process.env.URL || 'http://localhost:3000'

const handler = async event => {
	const { countryNames } = require('./../utils/stripe-helpers.js')

	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405,
			body: 'Method Not Allowed',
			headers: {
				Allow: 'Get'
			}
		}
	}

	let session
	const eventBody = JSON.parse(event.body)
	let shippingRateObject = eventBody.shippingRate
		? { shipping_rate: eventBody.shippingRate }
		: {}

	const items = eventBody.items.map(item => ({
		price: item.price,
		quantity: item.quantity,
		adjustable_quantity: { enabled: true }
	}))

	const hasTestTicket = eventBody.items.find(i => i.name === 'testticket')
	if (hasTestTicket && items.length === 1) {
		shippingRateObject = {}
	}

	try {
		session = await stripe.checkout.sessions.create({
			mode: 'payment',
			submit_type: 'pay',
			allow_promotion_codes: true,
			success_url: `${SITE_URL}/tickets/status/?status=success&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${SITE_URL}/tickets/`,
			payment_method_types: ['card', 'giropay', 'sofort', 'sepa_debit'],
			billing_address_collection: 'required',
			shipping_options: [shippingRateObject],
			shipping_address_collection: {
				allowed_countries: Object.keys(countryNames)
			},
			line_items: items
		})
	} catch (error) {
		console.error('❌  checkout:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}

	console.info('ℹ️  session:', session)

	return {
		statusCode: 200,
		body: JSON.stringify({
			sessionUrl: session.url,
			sessionId: session.id
		})
	}
}

module.exports = { handler }
