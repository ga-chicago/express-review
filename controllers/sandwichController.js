const express = require('express');
const router = express.Router();
const Sandwich = require('../models/sandwich')


//index
router.get('/', async (req, res, next) => {
  try {
    const foundSandwiches = await Sandwich.find({})
    res.render('sandwiches/index.ejs', {
      sandwiches: foundSandwiches
    })
  } catch(e) {
    next(e)
  }
})

//new
router.get('/new', (req, res) => {
  res.render('sandwiches/new.ejs');
})

// show
router.get('/:id', async (req, res, next) => {
  try{
    const foundSandwich = await Sandwich.findById(req.params.id)
    res.render('sandwiches/show.ejs', {
      sandwich: foundSandwich
    })    
  }catch(e) {
    next(e)
  }
})


//create
router.post('/', async (req, res, next) => {
  try {
    const createdSandwich = await Sandwich.create(req.body)
    res.redirect('/sandwiches');     
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedSandwich = await Sandwich.findByIdAndRemove(req.params.id)
    res.redirect('/sandwiches')
  } catch(err) {
    next(err)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const foundSandwich = await Sandwich.findById(req.params.id);
    res.render('sandwiches/edit.ejs', {
      sandwich: foundSandwich
    })    
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedSandwich = await Sandwich.findByIdAndUpdate(req.params.id, req.body);   
    res.redirect('/sandwiches/' + req.params.id);
  } catch(err) {
    next(err)
  }
})



module.exports = router;