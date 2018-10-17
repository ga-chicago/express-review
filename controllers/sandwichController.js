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

router.delete('/:id', (req, res) => {
  Sandwich.findByIdAndRemove(req.params.id, (err, deletedSandwich) => {
    if(err) res.send('error', err);
    res.redirect('/sandwiches')
  })
})

router.get('/:id/edit', (req, res) => {
  Sandwich.findById(req.params.id, (err, foundSandwich) => {
    res.render('sandwiches/edit.ejs', {
      sandwich: foundSandwich
    })    
  })
})

router.put('/:id', (req, res) => {
  Sandwich.findByIdAndUpdate(req.params.id, req.body, (err, updatedSandwich) => {
    if(err) console.log(err);
    res.redirect('/sandwiches/' + req.params.id);
  })
})



module.exports = router;