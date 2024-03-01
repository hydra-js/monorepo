import express from 'express';

import authHandler from './handlers/auth';
import userHandler from './handlers/user';
import namespaceHandler from './handlers/namespace.js';
import resourceHandler from './handlers/resource.js';
import routeHandler from './handlers/route.js';
import healthcheck from './handlers/default/health.js';
import { authUser } from './middlewares';

export const consoleRouter = express.Router();
export const defaultRouter = express.Router();

/** Console API Routes */
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
consoleRouter.get('/namespace', namespaceHandler.getAll);
consoleRouter.get('/namespace/:name', namespaceHandler.getSingle);
consoleRouter.post('/namespace', namespaceHandler.post);
consoleRouter.put('/namespace/:name', namespaceHandler.put);
consoleRouter.patch('/namespace/:name', namespaceHandler.patch);
consoleRouter.delete('/namespace/:name', namespaceHandler.delete);

// resouce
consoleRouter.get('/resource', resourceHandler.getAll);
consoleRouter.get('/resource/:name', resourceHandler.getSingle);
consoleRouter.post('/resource', resourceHandler.post);
consoleRouter.put('/resource/:name', resourceHandler.put);
consoleRouter.patch('/resource/:name', resourceHandler.patch);
consoleRouter.delete('/resource/:name', resourceHandler.delete);

/** Default Server API Routes */
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

defaultRouter.get('/health', healthcheck);
defaultRouter.get('/bootstrap', () => {}); // @todo: bootsrtap the server if not yet done. return badReqeust() if server is already spinned up

defaultRouter.get('/:resource/:id', routeHandler.getAll);
defaultRouter.get('/:resource/', routeHandler.getSingle);
defaultRouter.post('/:resource', routeHandler.post);
defaultRouter.put('/:resource/:id', routeHandler.put);
defaultRouter.patch('/:resource/:id', routeHandler.patch);
defaultRouter.delete('/:resource/:id', routeHandler.delete);

export default { consoleRouter, defaultRouter };
