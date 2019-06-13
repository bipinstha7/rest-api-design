const express = require('express')
const router = express.Router()

const ItemsService = require('../services/items')
const isAuth = require('../middlewares/isAuth')
const attachCurrentUser = require('../middlewares/attachCurrentUser')
const ItemModel = require('../models/item')

router.get('/', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemsServiceInstance = new ItemsService(ItemModel)

		const items = await itemsServiceInstance.getMyItems(user)
		res.status(200).json(items)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemId = req.params.id

		const itemsServiceInstance = new ItemsService(ItemModel)

		const items = await itemsServiceInstance.getItem(itemId, user)
		res.status(200).json(items)
	} catch (error) {
		next(error)
	}
})

router.post('/', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemDTO = req.body.item
		const itemsServiceInstance = new ItemsService(ItemModel)
		const item = await itemsServiceInstance.create(itemDTO, user)
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

		const itemsServiceInstance = new ItemsService(ItemModel)
		const itemUpdated = await itemsServiceInstance.update(itemId, itemDTO, user)

		res.status(200).json(itemUpdated)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', isAuth, attachCurrentUser, async (req, res) => {
	try {
		const user = req.currentUser
		const itemId = req.params.id
		const itemsServiceInstance = new ItemsService(ItemModel)
		await itemsServiceInstance.remove(iemId, user)

		res.status(200).json('success')
	} catch (error) {
		next(error)
	}
})

module.exports = router
