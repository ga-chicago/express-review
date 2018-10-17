const express = require('express');
const router = express.Router();
const Sandwich = require('../models/sandwich')
const Ingredient = require('../models/ingredient')


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
  // get ingredients first
  Ingredient.find({}, (err, foundIngredients) => {
    res.render('sandwiches/new.ejs', {
      ingredients: foundIngredients
    });
        
  })
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
  console.log(req.body.ingredients);
  const sandwichToAdd = {
    name: req.body.name
  }
  Sandwich.create(sandwichToAdd, (err, createdSandwich) => {
    console.log("---------------------------here is created sandwich");
    console.log(createdSandwich);
    Ingredient.find({
      _id: {
        $in: req.body.ingredients
      }
    }, (err, foundIngredients) => {
      foundIngredients.forEach(ing => {
        createdSandwich.ingredients.push(ing)
      })
      createdSandwich.save((err, result) => {
        if(err) console.log(err); {
          console.log(result);
          res.redirect('/sandwiches') 
        }
      })
    })
  });
})

router.delete('/:id', (req, res) => {
  Sandwich.findByIdAndRemove(req.params.id, (err, deletedSandwich) => {
    if(err) res.send('error', err);
    res.redirect('/sandwiches')
  })
})

// edit
router.get('/:id/edit', (req, res) => {
  // this route now needs to get and send along 
  // all ingredient possibilities in case user wants to change them
  Ingredient.find({}, (err, foundIngredients) => {
    Sandwich.findById(req.params.id, (err, foundSandwich) => {
      console.log('foundIngredients');
      console.log(foundIngredients);
      console.log('foundSandwich');
      console.log(foundSandwich);
      res.render('sandwiches/edit.ejs', {
        sandwich: foundSandwich,
        possibleIngredients: foundIngredients
      }) 
    })
  })
})

// update
router.put('/:id', (req, res) => {
  // check req.body
  res.json(req.body);
  // manipulate on/off checkbox values in req.body to be true/fase

  // do the update

  // Sandwich.findByIdAndUpdate(req.params.id, req.body, (err, updatedSandwich) => {
  //   if(err) console.log(err);
  //   res.redirect('/sandwiches/' + req.params.id);
  // })
})



module.exports = router;