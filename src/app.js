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



app.use((error, req, res, next) => {
	console.error('error', error)
	res.status(error.statusCode || 500).json({ message: error.message })
})

module.exports = app
