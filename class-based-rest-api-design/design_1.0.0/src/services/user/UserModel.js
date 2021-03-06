const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	deleted: {
		type: Boolean,
		default: false
	}
})

module.exports = mongoose.model('User', userSchema)
