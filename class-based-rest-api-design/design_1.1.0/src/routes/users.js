const express = require('express')
const router = express.Router()

const { userService } = require('../services')
const isAuth = require('../middlewares/isAuth')
const attachCurrentUser = require('../middlewares/attachCurrentUser')
const checkRole = require('../middlewares/checkRole')

router.post('/login', async (req, res) => {
	const { email, password } = req.body.user

	try {
		const { user, token } = await userService.login(email, password)
		res.status(200).json({ user, token })
	} catch (error) {
		next(error)
	}
})

router.post('/login-as', isAuth, attachCurrentUser, checkRole('admin'), async (req, res) => {
	try {
		const { email } = req.body.user
		const { user, token } = await userService.loginAs(email)
		res.status(200).json({ user, token })
	} catch (error) {
		next(error)
	}
})

router.post('/signup', async (req, res) => {
	try {
		const { name, email, password } = req.body.user

		const { user, token } = await userService.signUp(email, password, name)
		res.status(200).json({ user, token })
	} catch (error) {
		next(error)
	}
})

module.exports = router
