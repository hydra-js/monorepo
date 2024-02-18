const express = require('express');
const path = require('path');

const logger = require('utils/logger');

const startingPort = Number(process.env.PORT);

const startServer = ({ port, name = 'Server', publicPath }) => {
  const app = express();

  app.use(express.static(path.join(publicPath)));

  // @todo: API Routes
  app.get('/api', (req, res) => {
    res.send(name);
  });

  app.get('/*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  app.listen(port, () => {
    logger.log(`${name} is listening at ::${port}`);
  });
};

export const startConsole = () => {
  const publicPath = path.join(__dirname, '..', '..', 'public');
  startServer({ port: startingPort, name: 'Console', publicPath });
};

export const startDefaultServer = () => {
  const defaultAppPort = startingPort + 1;
  const publicPath = path.join(__dirname, '..', '..', 'public', 'default');
  startServer({ port: defaultAppPort, name: 'Default App', publicPath });
};
