const users = require('./users')
const items = require('./items')
const error = require('../middlewares/errors')

module.exports = app => {
	app.use('/api/v1/users', users)
	app.use('/api/v1/items', items)
	app.use(error)
}
