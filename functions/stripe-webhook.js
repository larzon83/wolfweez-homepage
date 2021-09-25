const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const endpointSecret = 'whsec_VgbvnNWiUY1D3c6V4DcrOpxdhAx1RTUq'

const handler = async event => {
	const sig = event.headers['stripe-signature']

	let eventType
	let eventDataObject

	try {
		const stripeEvent = await stripe.webhooks.constructEvent(
			event.body,
			sig,
			endpointSecret
		)
		eventType = stripeEvent.type
		eventDataObject = stripeEvent.data.object
	} catch (err) {
		console.error(`Stripe webhook failed with ${err}`)
		return {
			statusCode: 400,
			body: `Webhook Error: ${err.message}`
		}
	}

	console.log('sig:', sig)
	console.log('eventType:', eventType)
	console.log('eventDataObject:', eventDataObject)

	return {
		statusCode: 200,
		body: JSON.stringify({ received: true })
	}
}

module.exports = { handler }
