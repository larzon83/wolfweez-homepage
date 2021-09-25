const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async event => {
	const sig = event.headers['stripe-signature']
	let stripeEvent

	try {
		stripeEvent = await stripe.webhooks.constructEvent(
			event.body,
			sig,
			process.env.NODE_ENV === 'development'
				? 'whsec_VgbvnNWiUY1D3c6V4DcrOpxdhAx1RTUq'
				: process.env.STRIPE_WEBHOOK_SECRET
		)
	} catch (err) {
		console.error(`Stripe webhook failed with ${err}`)
		return {
			statusCode: 400,
			body: `Webhook Error: ${err.message}`
		}
	}

	const { eventType, eventDataObject } = stripeEvent

	console.log('sig:', sig)
	console.log('eventType:', eventType)
	console.log('eventDataObject:', eventDataObject)

	return {
		statusCode: 200,
		body: JSON.stringify({ received: true })
	}
}

module.exports = { handler }
