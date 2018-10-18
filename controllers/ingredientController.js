const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient')
const Sandwich = require('../models/sandwich')

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

// update
router.put('/:id', async (req, res, next) => {
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body);
    
    // find any sandwiches that have this ingred and replace that ingredient with updated ingredient in the array
    const sandwichesWithIng = await Sandwich.find({'ingredients._id': req.params.id})

    // loop over those sandwiches and find the index of the ing and splice
    sandwichesWithIng.forEach(
      async (sand) => {
        // find index of this ing
        const index = sand.ingredients.findIndex(ing => ing.id == req.params.id);
        sand.ingredients.splice(index, 1, updatedIngredient);
        const result = await sand.save();
      }
    )

    res.redirect('/ingredients/' + req.params.id);

  } catch(err) {
    next(err)
  }
})



module.exports = router;