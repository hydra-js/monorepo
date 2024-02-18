const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');

const logger = require('./logger');

// Normalize port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

function createServer({ port, namespace, router }) {
  const app = express();

  const publicPathTrail = [__dirname, '..', '..', 'public'];
  if (namespace !== 'console') publicPathTrail.push(namespace);

  app.use('/assets', express.static(path.join(...publicPathTrail, 'assets')));

  app.use(cors());
  app.use(helmet());
  app.use(xss());

  // Rate limiting middleware to prevent abuse
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
  app.use(mongoSanitize());
  app.use(hpp());

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));

  // Set port
  const normalizedPort = normalizePort(port);
  app.set('port', normalizedPort);

  // API Routes
  app.use('/api', router);

  app.use(express.static(path.join(...publicPathTrail)));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(...publicPathTrail, 'index.html'));
  });

  // Error handling middleware
  app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(500).send('Internal Server Error!');
  });

  // Not found middleware
  app.use((req, res) => {
    res.status(404).send('Not Found');
  });

  // Start the server
  const server = app.listen(normalizedPort, () => {
    logger.log(`${namespace} is running on port ${normalizedPort}`);
  });

  return server;
}

module.exports = createServer;
