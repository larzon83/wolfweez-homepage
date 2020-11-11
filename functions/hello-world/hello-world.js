// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
// eslint-disable-next-line require-await
const handler = async event => {
	try {
		const subject = event.queryStringParameters.name || 'World'
		return {
			statusCode: 200,
			body: JSON.stringify({ message: `Hello ${subject}` })
			// // more keys you can return:
			// headers: { "headerName": "headerValue", ... },
			// isBase64Encoded: true,
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

module.exports = { handler }

// exports.handler = function (event, context, callback) {
// 	callback(null, {
// 		statusCode: 200,
// 		body: 'Hello, World'
// 	})
// }
