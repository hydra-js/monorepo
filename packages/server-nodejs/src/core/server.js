const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');

const logger = require('./utils/logger');

// Normalize port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

async function createServer({ namespace, router, port }) {
  const app = express();

  // Assets
  const plublicPath = path.join(__dirname, '..', '..', 'public', namespace);
  app.use('/assets', express.static(path.join(...plublicPath, 'assets')));

  app.use(cors());
  app.disable('x-powered-by'); // Reduce fingerprinting
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
  app.set('port', port);

  // API Routes
  app.use('/api', router);

  // Frontend
  app.use(express.static(plublicPath));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(plublicPath, 'index.html'));
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
  const server = app.listen(port, () => {
    logger.log(`${namespace} is running on port ${port}`);
  });
  return server;
}

async function startServer({ port, namespace, router }) {
  createServer({ port: normalizePort(port), namespace, router });
}

module.exports = startServer;
