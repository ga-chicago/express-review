const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/register', async (req, res, next) => {
  res.render('auth/register.ejs', {
    message: req.session.message
  });
})
router.post('/register', async (req, res, next) => {
  try {
    const desiredUsername = req.body.username;
    // make sure no other people have this username
    const user = await User.find({
      username: desiredUsername
    })
    console.log(user);
    if(user.length > 0) {
      req.session.message = "Username already taken!"
      res.redirect('/auth/register')
    }

    else {
      const createdUser = await User.create({
        username: desiredUsername,
        password: req.body.password
      })
      res.redirect('/sandwiches')
    }

  } catch(err) {
    next(err)
  }

})
router.get('/login', async (req, res, next) => {
  
})
router.post('/login', async (req, res, next) => {
  
})

module.exports = router;