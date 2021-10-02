const stripe = require('stripe')(
	process.env.NUXT_ENV_TEST_MODE === 'true'
		? process.env.STRIPE_SECRET_KEY_TEST
		: process.env.STRIPE_SECRET_KEY_LIVE
)

const handler = async event => {
	const sessionId = event.queryStringParameters.sessionId || ''
	let session
	let charges

	try {
		const sessionPromise = stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items']
		})
		const chargesPromise = stripe.charges.list({ limit: 100 })

		const [sessionResult, chargesResult] = await Promise.all([
			sessionPromise,
			chargesPromise
		])

		session = sessionResult
		charges = chargesResult
	} catch (error) {
		console.error('❌  get-checkout-session:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}

	session.line_items = session.line_items.data.map(item => item)

	const charge = charges.data.find(
		c => c.payment_intent === session.payment_intent
	)

	console.info('ℹ️  session:', session)
	console.info('ℹ️  charge:', charge)

	// const customer = await stripe.customers.retrieve(session.customer)

	return {
		statusCode: 200,
		body: JSON.stringify({ session, charge: charge || {} })
	}
}

module.exports = { handler }
