module.exports = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next)
}

/* We can write same method as: 1 OR 2*/

// ## 1
// function catchError(fn) {
// 	return function(req, res, next) {
// 		Promise.resolve(fn(req, res, next)).catch(next)
// 	}
// }

// ## 2
// function catchError(fn) {
// 	return function(req, res, next) {
// 		try {
// 			fn(req, res, next)
// 		} catch (e) {
// 			next(e)
// 		}
// 	}
// }
