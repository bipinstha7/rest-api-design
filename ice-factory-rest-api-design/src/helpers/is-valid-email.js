module.exports = function isVaidEmail(email) {
	const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
	return valid.test(email)
}
