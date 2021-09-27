// Inspiration:
// Mainly from here: https://github.com/stripe-samples/checkout-netlify-serverless
// also:
// https://github.com/stripe-samples/accept-a-payment
// and almost the same:
// https://github.com/stripe-samples/checkout-one-time-payments

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
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

	const items = JSON.parse(event.body).map(item => ({
		...item,
		adjustable_quantity: { enabled: true }
	}))

	try {
		session = await stripe.checkout.sessions.create({
			mode: 'payment',
			submit_type: 'pay',
			allow_promotion_codes: true,
			success_url: `${SITE_URL}/tickets/status/?status=success&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${SITE_URL}/tickets/`,
			payment_method_types: [
				'card',
				'ideal',
				'giropay',
				'sofort',
				'sepa_debit'
			],
			billing_address_collection: 'required',
			shipping_rates: ['shr_1Je60JBfAFuG6uOs6j4oGfs6'],
			shipping_address_collection: {
				allowed_countries: Object.keys(countryNames)
			},
			line_items: items
			// automatic_tax: { enabled: false, status: null }, // TODO:
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
