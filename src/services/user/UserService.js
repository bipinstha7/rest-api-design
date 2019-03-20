class UserService {
	constructor(UserModel) {
		this.UserModel = UserModel
	}

	createUser(firstName, lastName) {
		const user = new this.UserModel({ firstName, lastName })
		return user.save()
	}

	async listUsers(offset = 0, limit = 0, fields = []) {
		// .find(condition, select, options)
		const users = await this.UserModel.find({ deleted: false }, null, { skip: offset, limit })

		if (!fields.length) return users

		// return Array.from(users).map(user => {
		return users.map(user => {
			return this._extractFields(user, fields)
		})
	}

	async getUser(userId, fields = []) {
		const user = await this.UserModel.findOne({ _id: userId, deleted: false })
		return this._extractFields(user, fields)
	}

	

	_extractFields(user, fields) {
		if (!fields.length) return user

		const result = fields.reduce((acc, field) => {
			acc[field] = user[field]
			return acc
		}, {})

		return result
	}
}

module.exports = UserService
