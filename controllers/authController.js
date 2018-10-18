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
  res.render('auth/login.ejs', {
    message: req.session.message
  })
})
router.post('/login', async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      username: req.body.username
    })
    if(!foundUser) {
      req.session.message = "Invalid username or password"; console.log("bad username");
      res.redirect('/auth/login');
    } else {
      if(foundUser.password == req.body.password) {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        // you could clear the  login error  message here
        res.redirect('/sandwiches')
      } else {
         req.session.message = "Invalid username or password"; console.log("bad password");
         res.redirect('/auth/login')
      }
    }
  } catch(err) {
    next(err)
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/auth/login');
  });
})


module.exports = router;