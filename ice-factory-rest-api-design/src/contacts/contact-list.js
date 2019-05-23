// import makeContact from './contact'
// import { UniqueConstraintError } from '../helpers/errors'

const makeContact = require('./contact')
const { UniqueConstraintError } = require('../helpers/errors')

module.exports = function makeContactList(ContactModel) {
	return Object.freeze({
		add,
		// findByEmail,
		findById,
		getItems,
		// remove,
		// replace,
		// update,
	})

	async function add({ contact }) {
		const { result, ops } = await ContactModel.create(contact).catch(
			mongoError => {
				const [errorCode] = mongoError.message.split(' ')
				if (errorCode === 'E11000') {
					const [_, mongoIndex] = mongoError.message
						.split(':')[2]
						.split(' ')
					throw new UniqueConstraintError(
						mongoIndex === 'ContactEmailIndex'
							? 'emailAddress'
							: 'contactId'
					)
				}
				throw mongoError
			}
		)

		return {
			success: result.ok === 1,
			created: documentToContact(ops[0]),
		}
	}

	async function findById({ contactId }) {
		const found = await ContactModel.findOne({ _id: contactId })
		if (found) {
			return documentToContact(found)
		}
		return null
	}

	async function getItems({ max = 100, before, after } = {}) {
		const query = {}
		if (before || after) {
			query._id = {}
			query._id = before ? { ...query._id, $lt: before } : query._id
			query._id = after ? { ...query._id, $gt: before } : query._id

			return (await ContactModel.find(query)
				.limit(Number(max))
				.toArray()).map(documentToContact)
		}
	}

	function documentToContact({ _id: contactId, ...doc }) {
		return makeContact({ contactId, ...doc })
	}
}
