const express = require('express');
const app = express();

const port = 3001;

app.get('/', (req, res) => {
  res.send('Welcome to the RESTful API Tutorial!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
