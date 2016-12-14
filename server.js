const express = require('express');
const hostname = 'localhost';
const port = process.env.PORT || 3001;
const app = express();
const data = require('./data');


app.get('/', (req, res) => {
  res.send('Hello world !!');
})


server.listen(port, hostname, () => {
  console.log(`Server is running on adress http://${hostname}:${port}`)
})
