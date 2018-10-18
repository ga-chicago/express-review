const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient')


//index
router.get('/', async (req, res, next) => {
  try {
    const foundIngredients = await Ingredient.find({})
    res.render('ingredients/index.ejs', {
      ingredients: foundIngredients
    })    
  } catch(err) {
    next(err)
  }
})

//new
router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
})

// show
router.get('/:id', async (req, res, next) => {
  try {
    const foundIngredient = await Ingredient.findById(req.params.id)
    res.render('ingredients/show.ejs', {
      ingredient: foundIngredient
    })        
  } catch(err) {
    next(err)
  }
})


//create
router.post('/', async (req, res, next) => {
  try {
    const createdIngredient = await Ingredient.create(req.body);
    res.redirect('/ingredients') 
  } catch(err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedIngredient = await Ingredient.findByIdAndRemove(req.params.id)
    res.redirect('/ingredients')
  } catch(err) {
    next(err)
  }
})

router.get('/:id/edit', async (req, res, next) => {
  try {
    const foundIngredient = await Ingredient.findById(req.params.id)
    res.render('ingredients/edit.ejs', {
      ingredient: foundIngredient
    });
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/ingredients/' + req.params.id);
  } catch(err) {
    next(err)
  }
})



module.exports = router;