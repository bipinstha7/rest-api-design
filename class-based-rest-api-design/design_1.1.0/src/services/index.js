const UserModel = require('../models/user')
const ItemModel = require('../models/item')
const UserService = require('./auth')
const ItemService = require('./items')

module.exports = {
	userService: new UserService(UserModel),
	itemService: new ItemService(ItemModel),
}
