const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//DB CONNECTION
require('./db/db')


//MIDDLEWARE
// app.use((req, res, next) => {
//   console.log("MIDDLEWARE---every route passes thru here");
//   next();
// })
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//CONTROLLERS
const sandwichController = require('./controllers/sandwichController')
app.use('/sandwiches', sandwichController)
const ingredientController = require('./controllers/ingredientController')
app.use('/ingredients', ingredientController)

// default
app.get('/', (req, res) => {
  res.send('whatchadoin');
})


app.listen(PORT, () => {
  console.log((new Date(Date.now())).toLocaleTimeString() + ': app listening on port ' + PORT);
})