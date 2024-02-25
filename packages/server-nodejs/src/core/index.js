require('./config');

const mongoose = require('mongoose');

const { HYDRA_MONGO_URL, HYDRA_PORT } = require('./config');
const logger = require('./logger');

const startServer = require('./server');

const { consoleRouter, defaultRouter } = require('./routes');

const PORT = Number(HYDRA_PORT);

async function startConsole() {
  startServer({ namespace: 'CONSOLE', port: PORT, router: consoleRouter });
}

async function startDefaultServer() {
  startServer({
    namespace: 'DEFAULT',
    port: PORT + 1000,
    router: defaultRouter,
  });
}

async function bootstrap(init) {
  /**
   * Start database server
   */
  // By default, Mongoose skips properties not defined in the schema (strictQuery).
  mongoose.set('strictQuery', true);

  // Connect to MongoDB
  try {
    await mongoose.connect(HYDRA_MONGO_URL, {});
    init();
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  bootstrap,
  startConsole,
  startDefaultServer,
};
