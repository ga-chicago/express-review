const express = require('express');
const router = express.Router();
const Sandwich = require('../models/sandwich')
const Ingredient = require('../models/ingredient')

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
router.get('/new', async (req, res, next) => {
  // get ingredients
  try {
    const possibleIngredients = await Ingredient.find({});
    res.render('sandwiches/new.ejs', {
      ingredients: possibleIngredients
    });
  } catch(err) {
    next(err)
  }
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
  const sandwichToAdd = {
    name: req.body.name
  }
  try {
    const createdSandwich = await Sandwich.create(sandwichToAdd)

    // get ings from db
    const desiredIngredients = await Ingredient.find({
      _id: {
        $in: req.body.ingredients
      }
    })
    desiredIngredients.forEach(ingred => {
      createdSandwich.ingredients.push(ingred)
    })

    const result = await createdSandwich.save();

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

// edit
router.get('/:id/edit', async (req, res, next) => {
  try {
    const foundSandwich = await Sandwich.findById(req.params.id);
    const possibleIngredients = await Ingredient.find({});
    res.render('sandwiches/edit.ejs', {
      sandwich: foundSandwich,
      possibleIngredients: possibleIngredients
    })    
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  console.log(req.body);
  try {
    const foundSandwich = await Sandwich.findById(req.params.id); 
    foundSandwich.name = req.body.name
    foundSandwich.ingredients = [];

    // get ings from db
    const desiredIngredients = await Ingredient.find({
      _id: {
        $in: req.body.ingredients
      }
    })
    desiredIngredients.forEach(ingred => {
      foundSandwich.ingredients.push(ingred)
    })

    await foundSandwich.save();

    res.redirect('/sandwiches/' + req.params.id);
  } catch(err) {
    next(err)
  }
})



module.exports = router;