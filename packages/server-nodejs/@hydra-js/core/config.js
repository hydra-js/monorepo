const dotenv = require('dotenv');

const config = dotenv.config();
if (config.error) throw config.error;

const { parsed: envs } = config;

export default {
  ...envs,
  HYDRA_ENV: process.env.NODE_ENV,
};
