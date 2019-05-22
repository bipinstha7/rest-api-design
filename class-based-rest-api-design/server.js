const app = require('./src/app')
const mongoose = require('mongoose')
const keys = require('./config/keys')

mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true })
	.then(() => console.log('Mongodb is connected'))
	.catch(err => console.log({ err }))

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})

process.on('unhandledRejection', error => {
	console.log(error.message)
	process.exit(1)
})
