const express = require('express');
const path = require('path');

const logger = require('../utils/logger');

const startingPort = Number(process.env.PORT);

const startServer = (port = process.env.PORT) => {
  const app = express();

  app.use(
    express.static(path.join(path.join(__dirname, '..', '..', 'public'))),
  );

  // @todo: API Routes
  app.get('/api', (req, res) => {
    res.json({});
  });

  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
  });

  app.listen(port, () => {
    logger.log(`Server is listening at ::${port}`);
  });
};

export const startConsole = () => {
  startServer(startingPort);
};

export const startDefaultServer = () => {
  const defaultAppPort = startingPort + 1;
  startServer(defaultAppPort);
};
