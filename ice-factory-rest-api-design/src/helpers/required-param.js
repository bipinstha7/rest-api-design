// import { RequiredParameterError } from './errors'
const { RequiredParameterError } = require('./errors')

module.exports = function requiredParam(param) {
	throw new RequiredParameterError(param)
}
