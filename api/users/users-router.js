const express = require('express');
const {
  validateUserId,
  validateUser, 
  validatePost
} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required
const User = require('./users-model');
const Post = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
  .then(users =>{
    res.json(users)
  })
  .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.name)
  User.insert({name: req.name})
  .then(newUser =>{
    //throw new Error('dang')
    res.status(201).json(newUser)
  })
  .catch(next)
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.name)
  User.update(req.params.id, {name: req.name})
  .then(()=>{
    return User.getById(req.params.id)
  })
  .then(user =>{
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log(req.user)
  try{
    await User.remove(req.params.id)
    res.json(req.user)
  } catch (err){
    next(err)
  }

});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  console.log(req.user)

  try{
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err){
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user)
  console.log(req.text)


});

router.use((err, req, res, next)=>{
  res.status(err.status || 500).json({
    customMessage: 'something tragic in users router went down, sorry',
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router
module.exports = router