const stripe = require('stripe')(
	process.env.NUXT_ENV_TEST_MODE === 'true'
		? process.env.STRIPE_SECRET_KEY_TEST
		: process.env.STRIPE_SECRET_KEY_LIVE
)

const handler = async event => {
	const sessionId = event.queryStringParameters.sessionId || ''
	let session

	try {
		session = await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['line_items', 'payment_intent.charges']
		})
	} catch (error) {
		console.error('❌  get-checkout-session:', error)
		return { statusCode: error.statusCode, body: JSON.stringify(error) }
	}

	session.line_items = session.line_items.data.map(item => item)

	const charge = session.payment_intent.charges.data.find(
		c => c.payment_intent === session.payment_intent.id
	)

	console.info('ℹ️  session:', session)
	console.info('ℹ️  charge:', charge)

	return {
		statusCode: 200,
		body: JSON.stringify({ session, charge: charge || {} })
	}
}

module.exports = { handler }
