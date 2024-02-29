const express = require('express');

const authHandler = require('./handlers/auth');
const userHandler = require('./handlers/user');
const { authUser } = require('./middlewares');

const consoleRouter = express.Router();
const defaultRouter = express.Router();

/**
 * Console API Routes
 */
// @todo: generate OpenAPI Spec.
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

// console.auth
consoleRouter.post('/auth/register', authHandler.register);
consoleRouter.post('/auth/login', authHandler.login);

// console.users
consoleRouter.get('/users', [authUser('admin')], userHandler.getAll);
consoleRouter.get(
  '/users/:id',
  [authUser('admin', 'own')],
  userHandler.getSingle,
);
consoleRouter.post('/users', [authUser('admin')], userHandler.post);
consoleRouter.patch(
  '/users/:id',
  [authUser('admin', 'own')],
  userHandler.patch,
);
consoleRouter.delete('/users/:id', [authUser('admin')], userHandler.delete);

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
