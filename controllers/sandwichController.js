const express = require('express');
const router = express.Router();

//new
router.get('/new', (req, res) => {
  res.render('sandwiches/new.ejs');
})

//create
router.post('/', (req, res) => {
  res.json(req.body);
})

module.exports = router;