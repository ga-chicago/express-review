const express = require('express');
const router = express.Router();
const Sandwich = require('../models/sandwich')

//new
router.get('/new', (req, res) => {
  res.render('sandwiches/new.ejs');
})

//create
router.post('/', (req, res) => {
  Sandwich.create(req.body, (err, createdSandwich) => {
    res.json(createdSandwich);    
  });
})

module.exports = router;