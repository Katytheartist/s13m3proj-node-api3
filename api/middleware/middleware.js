function logger(req, res, next) {
const method = req.method
const url = req.originalUrl
const timestamp = new Date().toLocaleString()
console.log(`${method} to ${url} at [${timestamp}]`)
next()
// DO YOUR MAGIC
}

function validateUserId(req, res, next) {
console.log('validateUserId middleware')
next()
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
console.log('validateUser middleware')
next()
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
console.log('validatePost middleware')
next()
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}