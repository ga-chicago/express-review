const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient')


//index
router.get('/', (req, res) => {
  Ingredient.find({}, (err, foundIngredients) => {
    res.render('ingredients/index.ejs', {
      ingredients: foundIngredients
    })
  })
})

//new
router.get('/new', (req, res) => {
  res.render('ingredients/new.ejs');
})

// show
router.get('/:id', (req, res) => {
  Ingredient.findById(req.params.id, (err, foundIngredient) => {
    res.render('ingredients/show.ejs', {
      ingredient: foundIngredient
    })    
  });
})


//create
router.post('/', (req, res) => {
  Ingredient.create(req.body, (err, createdIngredient) => {
    // res.json(createdSandwich);   
    res.redirect('/ingredients') 
  });
})

router.delete('/:id', (req, res) => {
  Ingredient.findByIdAndRemove(req.params.id, (err, deletedIngredient) => {
    if(err) res.send('error', err);
    res.redirect('/ingredients')
  });
})

router.get('/:id/edit', (req, res) => {
  Ingredient.findById(req.params.id, (err, foundIngredient) => {
    res.render('ingredients/edit.ejs', {
      ingredient: foundIngredient
    });
  })
})

router.put('/:id', (req, res) => {
  Ingredient.findByIdAndUpdate(req.params.id, req.body, (err, updatedIngredient) => {
    if(err) console.log(err);
    res.redirect('/ingredients/' + req.params.id);
  })
})



module.exports = router;