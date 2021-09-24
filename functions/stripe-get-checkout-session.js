const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async event => {
	const sessionId = event.queryStringParameters.sessionId || ''

	try {
		const sessionPromise = stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items']
		})
		const chargesPromise = stripe.charges.list({ limit: 100 })

		const [session, charges] = await Promise.all([
			sessionPromise,
			chargesPromise
		])

		session.line_items = session.line_items.data.map(item => item)

		const charge = charges.data.find(
			c => c.payment_intent === session.payment_intent
		)

		console.log('charge:', charge)

		// const customer = await stripe.customers.retrieve(session.customer)

		return {
			statusCode: 200,
			body: JSON.stringify({ session, charge: charge || {} })
		}
	} catch (error) {
		console.error('get-checkout-session:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}
}

module.exports = { handler }
