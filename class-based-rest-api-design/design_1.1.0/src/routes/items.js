const express = require('express')
const router = express.Router()

const { itemService } = require('../services')
const isAuth = require('../middlewares/isAuth')
const attachCurrentUser = require('../middlewares/attachCurrentUser')
const ItemModel = require('../models/item')

router.get('/', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser

		const items = await itemService.getMyItems(user)
		res.status(200).json(items)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemId = req.params.id

		const items = await itemService.getItem(itemId, user)
		res.status(200).json(items)
	} catch (error) {
		next(error)
	}
})

router.post('/', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemDTO = req.body.item
		const item = await itemService.create(itemDTO, user)
		res.status(201).json(item)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemDTO = req.body.item
		const itemId = req.params.id

		const itemUpdated = await itemService.update(itemId, itemDTO, user)

		res.status(200).json(itemUpdated)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemId = req.params.id
		await itemService.remove(iemId, user)

		res.status(200).json('success')
	} catch (error) {
		next(error)
	}
})

module.exports = router
