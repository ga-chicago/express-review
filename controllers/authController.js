const express = require('express');
const router = express.Router();

router.get('/register', async (req, res, next) => {
  res.render('auth/register.ejs');
})
router.post('/register', async (req, res, next) => {
  res.send(req.body)
})
router.get('/register', async (req, res, next) => {
  
})
router.post('/login', async (req, res, next) => {
  
})

module.exports = router;