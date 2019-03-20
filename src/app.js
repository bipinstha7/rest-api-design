const express = require('express')
const { userService } = require('./services')
const catchException = require('./middlewares/catchException')

const app = express()

app.use(express.json())

app.get(
	'/api/v1/users',
	catchException(async (req, res) => {
		let { offset, limit, fields } = req.query
		offset = parseInt(offset)
		limit = parseInt(limit)
		limit = Math.min(limit, 50)
		fields = fields ? fields.split(',') : undefined

		const users = await userService.listUsers(offset, limit, fields)
		res.json(users)
	})
)

app.post(
	'/api/v1/users',
	catchException(async (req, res) => {
		const { firstName, lastName } = req.body
		const user = await userService.createUser(firstName, lastName)
		res.json(user)
	})
)

// Two different approaches to handle custom commands
// # 1
app.post(
	'api/v1/users/:userId',
	catchException(async (req, res) => {
		const { command } = req.query

		switch (command) {
			case 'send-email':
				// TODO: Send email to user
				return res.json({ message: 'Email sent' })
			default:
				return res.json({ message: `${command} is not a valid command` })
		}
	})
)

// # 2
app.post(
	'/api/v1/users/:userId/send-email',
	catchException(async (req, res) => {
		// TODO: Send email to user
		res.json({ message: 'Email sent' })
	})
)

app.get(
	'/api/v1/users/:userId',
	catchException(async (req, res) => {
		const { userId } = req.params
		let { fields } = req.query
		fields = fields ? fields.split(',') : undefined

		const user = await userService.getUser(userId, fields)
		res.json(user)
	})
)



app.use((error, req, res, next) => {
	console.error('error', error)
	res.status(error.statusCode || 500).json({ message: error.message })
})

module.exports = app
