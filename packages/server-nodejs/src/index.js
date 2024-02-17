const express = require('express');
const path = require('path');

const logger = require('./utils/logger');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(path.join(__dirname, '..', 'public'))));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  logger.log(`Server is listening at ::${port}`);
});
