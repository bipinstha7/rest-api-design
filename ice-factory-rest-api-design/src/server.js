import express from 'express'
import handleContactRequest from './contacts'
import adpatRequest from './helpers/adapt-request'

const app = express()
app.use(express.json())

app.all('/contacts', contactsController)
app.get('contats/:id', contactsController)

function contactsController(req, res) {
	const httpRequest = adpatRequest(req)
	handleContactRequest(httpRequest)
		.then(({ headers, statusCode, data }) => 
			res
				.set(headers)
				.status(statusCode)
				.send(data)
		)
		.catch(err => res.status(500).end())
}

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})