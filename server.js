const express = require('express');
const app = express();
const PORT = 3000;



app.listen(PORT, () => {

  console.log((new Date(Date.now())).toLocaleTimeString() + ': app listening on port ' + PORT);
})