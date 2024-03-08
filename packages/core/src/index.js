/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable import/first */
require('dotenv').config();

import mongoose from 'mongoose';

import logger from './utils/logger.js';

import startServer from './server.js';
import { consoleRouter, defaultRouter } from './routes.js';
import config from './config.js';

const { HYDRA_MONGO_URL, HYDRA_PORT } = config;

const PORT = Number(HYDRA_PORT);

export async function startConsole() {
  startServer({ namespace: 'console', port: PORT, router: consoleRouter });
}

export async function startDefaultServer() {
  startServer({
    namespace: 'default',
    port: PORT + 1,
    router: defaultRouter,
  });
}

export async function bootstrap(init) {
  /** Start database server */
  mongoose.promise = global.Promise;
  // By default, Mongoose skips properties not defined in the schema (strictQuery).
  mongoose.set('strictQuery', true);

  // Connect to MongoDB
  try {
    await mongoose.connect(HYDRA_MONGO_URL, {});
    init();
    // @todo: verify database intergrity
    // @todo: fix it, if anything missing and log & nofity
  } catch (err) {
    logger.error(err);
  }
}
