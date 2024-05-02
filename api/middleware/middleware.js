const User = require('../users/users-model.js');

function logger(req, res, next) {
const method = req.method
const url = req.originalUrl
const timestamp = new Date().toLocaleString()
console.log(`${method} to ${url} at [${timestamp}]`)
next()
// DO YOUR MAGIC
}

async function validateUserId(req, res, next) {
console.log('validateUserId middleware')
try {
  const user = await User.getById(req.params.id)
  if(!user){
    res.status(404).json({
      message: 'no such user,'
    })
  } else {
    req.user = user
    next()
  }
} catch (err){
  res.status(500).json({
    message: 'problem findin user'
  })
}
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