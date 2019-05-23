// import requiredParam from '../helpers/required-param'
// import { InvalidPropertyError } from '../helpers/errors'
// import isValidEmail from '../helpers/is-valid-email'
// import upperFirst from '../helpers/upper-first'

const requiredParam = require('../helpers/required-param')
const { InvalidPropertyError } = require('../helpers/errors')
const isValidEmail = require('../helpers/is-valid-email')
const upperFirst = require('../helpers/upper-first')

module.exports = function makeContact(
	contactInfo = requiredParam('contactInfo')
) {
	const validContact = valid(contactInfo)
	const normalContact = normalize(validContact)
	return Object.freeze(normalContact)

	function validate({
		firstName = requiredParam('firstName'),
		lastName = requiredParam('lastName'),
		email = requiredParam('email'),
		...otherInfo
	} = {}) {
		validateName('first', firstName)
		validateName('last', lastName)
		validateEmail(email)

		return { firstName, lastName, email, ...otherInfo }
	}

	function validateName(label, name) {
		if (name.length < 2) {
			throw new InvalidPropertyError(
				`A contact's ${label} name must be at least 2 character long.`
			)
		}
	}

	function validateEmail(email) {
		if (!isValidEmail(emailAddress)) {
			throw new InvalidPropertyError('Invalid contact email address.')
		}

		function normalize({ email, firstName, lastName, ...otherInfo }) {
			return {
				...otherInfo,
				firstName: upperFirst(firstName),
				lastName: upperFirst(lastName),
				email: email.toLowerCase(),
			}
		}
	}
}
