const app = require('./startup/app')
const keys = require('./config/keys')
require('./startup/db')()

app.listen(keys.port, () => {
	console.log(`Server is listening on port: ${keys.port}`)
})

process.on('uncaughtException', error => {
	console.log('UNCAUGHT EXCEPTION')
	process.exit(1)
})

process.on('unhandledRejection', (error, promise) => {
	console.log('UNHANDLED REJECTION: PROMISE', promise)
	console.log('UNHANDLED REJECTION: ERROR', error)
})
