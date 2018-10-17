const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

//DB CONNECTION
require('./db/db')

//MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


//CONTROLLERS
const sandwichController = require('./controllers/sandwichController')
app.use('/sandwiches', sandwichController)

// default
app.get('/', (req, res) => {
  app.send('whatchadoin');
})


app.listen(PORT, () => {
  console.log((new Date(Date.now())).toLocaleTimeString() + ': app listening on port ' + PORT);
})