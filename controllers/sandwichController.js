const express = require('express');
const router = express.Router();
const Sandwich = require('../models/sandwich')


//index
router.get('/', (req, res) => {
  Sandwich.find({}, (err, foundSandwiches) => {
    res.render('sandwiches/index.ejs', {
      sandwiches: foundSandwiches
    })
  })
})

//new
router.get('/new', (req, res) => {
  res.render('sandwiches/new.ejs');
})

// show
router.get('/:id', (req, res) => {
  Sandwich.findById(req.params.id, (err, foundSandwich) => {
    res.render('sandwiches/show.ejs', {
      sandwich: foundSandwich
    })    
  })
})


//create
router.post('/', (req, res) => {
  Sandwich.create(req.body, (err, createdSandwich) => {
    // res.json(createdSandwich);   
    res.redirect('/sandwiches') 
  });
})

module.exports = router;