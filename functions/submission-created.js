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

// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
// const fetch = require('node-fetch')
// const { EMAIL_TOKEN } = process.env
// exports.handler = async event => {
// 	const email = JSON.parse(event.body).payload.email
// 	console.log(`Recieved a submission: ${email}`)
// 	return fetch('https://api.buttondown.email/v1/subscribers', {
// 		method: 'POST',
// 		headers: {
// 			Authorization: `Token ${EMAIL_TOKEN}`,
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ email })
// 	})
// 		.then(response => response.json())
// 		.then(data => {
// 			console.log(`Submitted to Buttondown:\n ${data}`)
// 		})
// 		.catch(error => ({ statusCode: 422, body: String(error) }))
// }
