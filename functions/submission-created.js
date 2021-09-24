// exports.handler = (event, context, callback) => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			resolve({
// 				statusCode: 200,
// 				body: 'promises1111'
// 			})
// 		}, 2000)
// 	})
// 		.then(res => {
// 			callback(null, {
// 				statusCode: 200,
// 				body: JSON.stringify(res.data)
// 			})
// 		})
// 		.catch(err => {
// 			callback(err)
// 		})
// }

// eslint-disable-next-line require-await
exports.handler = async (event, context) => {
	const payload = JSON.parse(event.body).payload
	console.log('calledddddd', payload)

	try {
		console.log('event:', JSON.stringify(event))
		return {
			statusCode: 200,
			body: JSON.stringify(event)
		}
	} catch (err) {
		return { statusCode: 500, body: err.toString() }
	}
}

// // // optionally configure local env vars
// // require('dotenv').config()

// // // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
// const process = require('process')

// const fetch = require('node-fetch')

// const { EMAIL_TOKEN } = process.env
// const handler = async event => {
// 	const { email } = JSON.parse(event.body).payload
// 	console.log(`Received a submission: ${email}`)
// 	try {
// 		const response = await fetch(
// 			'https://api.buttondown.email/v1/subscribers',
// 			{
// 				method: 'POST',
// 				headers: {
// 					Authorization: `Token ${EMAIL_TOKEN}`,
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify({ email })
// 			}
// 		)
// 		const data = await response.json()
// 		console.log(`Submitted to Buttondown:\n ${data}`)
// 	} catch (error) {
// 		return { statusCode: 422, body: String(error) }
// 	}
// }

// module.exports = { handler }
