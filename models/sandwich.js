const mongoose = require('mongoose');
const Ingredient = require('./ingredient')

const sandwichSchema = new mongoose.Schema({
  name: String,
  ingredients: [Ingredient.schema]
})

const Sandwich = mongoose.model('Sandwich', sandwichSchema)
module.exports = Sandwich;