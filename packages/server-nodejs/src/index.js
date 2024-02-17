const express = require('express');
const app = express();

const port = 3001;

app.use(express.static(path.join(path.join(__dirname, '..', 'public'))));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  logger.log(`Server is listening at ::${port}`);
});
