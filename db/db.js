const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/foodstuff', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('connected to mongoose')
})


mongoose.connection.on('disconnected', () => {
  console.log('disconnected from mongoose')
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})

