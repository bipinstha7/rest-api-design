module.exports = requiredRole => {
	return (req, res, next) => {
		if (req.currentUser.role !== requiredRole) {
			return res.status(401).send('Not Authorized')
		}

		next()
	}
}
