// import contactsController from '../server.js'
const contactsController = require('.')

describe('Contacts Endpoint', () => {
	it('Will NOT create a contact without an email address', async () => {
		const result = await contactsController({
			method: 'POST',
			body: JSON.stringify({
				firstName: 'Bipin',
				lastName: 'Shrestha',
			}),
		})

		expect(result).toEqual({
			headers: {
				'Content-Type': 'application/json',
			},
			statusCode: 400,
			data: JSON.stringify({
				success: false,
				error: 'email can not be null or undefined',
			}),
		})
	})
})
