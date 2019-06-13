const jwt = require('jsonwebtoken')

const keys = require('../config/keys')

function isAuth(req, res, next) {
	const authorizationHeader = req.headers.authorization
	const token = authorizationHeader && authorizationHeader.split(' ')[0] === 'Bearer'

	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}

	try {
		const decoded = jwt.verify(token, keys.jwtPrivateKey)
		req.user = decoded.data

		next()
	} catch (error) {
		res.status(401).json({ msg: 'Invalid Token' })
	}
}

module.exports = isAuth
