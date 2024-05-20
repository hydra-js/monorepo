/* eslint-disable import/first */
require('dotenv').config();

// eslint-disable-next-line import/no-extraneous-dependencies
import mongoose from 'mongoose';

import config from './config';
import { isValidMongoUrl } from './utils';

export { startDefaultServer as startServer } from './server';

const { HYDRA_MONGO_URL } = config;

const connectOrSkip = async (next) => {
  try {
    if (isValidMongoUrl(HYDRA_MONGO_URL)) {
      mongoose.promise = global.Promise;
      // By default, Mongoose skips properties not defined in the schema (strictQuery).
      mongoose.set('strictQuery', true);

      await mongoose.connect(HYDRA_MONGO_URL, {});
      // @TODO: verify database intergrity
      // @TODO: fix it, if anything missing and log & nofity
    }
    next();
  } catch (err) {
    next();
  }
};

export async function bootstrap(init) {
  try {
    connectOrSkip(() => {
      init();
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
}
