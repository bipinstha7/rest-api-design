const UserModel = require('../models/user')

module.exports = async (req, res, next) => {
	try {
		const user = await UserModel.findOne({ _id: req.user._id })

		if (!user) {
			return res.status(401).json('User not found')
		}

		req.currentUser = user
		next()
	} catch (error) {
		res.status(500).json(error)
	}
}
