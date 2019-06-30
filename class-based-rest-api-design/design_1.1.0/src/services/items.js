class ItemService {
	constructor(ItemModel) {
		this.ItemModel = ItemModel
	}

	async getMyItems(user) {
		return this.ItemModel.find({ owner: user._id }).populate({ path: 'owner', select: '-password -salt' })
	}

	async getItem(itemId, user) {
		return this.ItemModel.findOne({ _id: itemId, owner: user._id }).populate({
			path: 'owner',
			select: '-password -salt',
		})
	}

	async create(itemDTO, user) {
		const item = {
			...itemDTO,
			owner: user._id,
		}

		return this.ItemModel.create(item).populate({ path: 'owner', select: '-password -salt' })
	}

	async update(itemId, itemDTO, user) {
		const item = {
			...itemDTO,
			_id: itemId,
			owner: user._id,
		}

		return this.ItemModel.findOneAndUpdate({ _id: itemId, owner: user._id }, item, {
			new: true,
		}).populate({ path: 'owner', select: '-password -salt' })
	}

	async remove(itemId, user) {
		return this.ItemModel.remove({ _id: itemId, owner: user._id })
	}
}

module.exports = ItemService
