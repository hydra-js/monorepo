const express = require('express');

const consoleRouter = express.Router();
const defaultRouter = express.Router();

consoleRouter.get('/', (_, res) => {
  res.status(200).json({
    code: 200,
    message: 'This endpoint will return OpenAPI Specification in JSON',
  });
});

defaultRouter.get('/', (_, res) => {
  res.status(200).json({
    code: 200,
    message:
      'This endpoint will return OpenAPI Specification in JSON (defaultRouter)',
  });
});

module.exports = { consoleRouter, defaultRouter };
