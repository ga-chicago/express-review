const mongoose = require('mongoose');

const sandwichSchema = new mongoose.Schema({
  name: String
})

const Sandwich = mongoose.model('Sandwich', sandwichSchema)
module.exports = Sandwich