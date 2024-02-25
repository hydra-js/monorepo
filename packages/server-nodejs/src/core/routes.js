const express = require('express');

const userHandler = require('./handlers/user');

const consoleRouter = express.Router();
const defaultRouter = express.Router();

/**
 * Console API Routes
 */

consoleRouter.get('/', (_, res) => {
  res.status(200).json({
    code: 200,
    message: {
      info: {
        title: 'Hydra Console',
        version: '1.0.0-alpha.0',
        description: 'This endpoint will return OpenAPI Specification in JSON',
      },
      paths: {},
    },
  });
});

// users
consoleRouter.get('/users', userHandler.getAll);
consoleRouter.get('/users/:id', userHandler.getSingle);
consoleRouter.post('/users', userHandler.post);
consoleRouter.patch('/users/:id', userHandler.patch);
consoleRouter.delete('/users/:id', userHandler.delete);

// namespace
consoleRouter.get('/namespace', (_, res) => res.status(200).json({}));
consoleRouter.get('/namespace/:name', (_, res) => res.status(200).json({}));
consoleRouter.post('/namespace', (_, res) => res.status(200).json({}));
consoleRouter.put('/namespace/:name', (_, res) => res.status(200).json({}));
consoleRouter.patch('/namespace/:name', (_, res) => res.status(200).json({}));
consoleRouter.delete('/namespace/:name', (_, res) => res.status(200).json({}));

// resouce
consoleRouter.get('/resource', (_, res) => res.status(200).json({}));
consoleRouter.get('/resource/:name', (_, res) => res.status(200).json({}));
consoleRouter.post('/resource', (_, res) => res.status(200).json({}));
consoleRouter.put('/resource/:name', (_, res) => res.status(200).json({}));
consoleRouter.patch('/resource/:name', (_, res) => res.status(200).json({}));
consoleRouter.delete('/resource/:name', (_, res) => res.status(200).json({}));

/**
 * Default Server API Routes
 */

defaultRouter.get('/', (_, res) => {
  res.status(200).json({
    code: 200,
    message: {
      info: {
        title: 'Hydra Default Server',
        version: '1.0.0-alpha.0',
        description:
          'This endpoint will return OpenAPI Specification in JSON (Default Server)',
      },
      paths: {},
    },
  });
});

defaultRouter.get('/:resource/:id', (_, res) => res.status(200).json({}));
defaultRouter.get('/:resource/', (_, res) => res.status(200).json({}));
defaultRouter.post('/:resource', (_, res) => res.status(200).json({}));
defaultRouter.put('/:resource/:id', (_, res) => res.status(200).json({}));
defaultRouter.patch('/:resource/:id', (_, res) => res.status(200).json({}));
defaultRouter.delete('/:resource/:id', (_, res) => res.status(200).json({}));

module.exports = { consoleRouter, defaultRouter };
