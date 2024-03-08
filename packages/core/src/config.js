// return default value if actual not set
// eslint-disable-next-line no-extra-boolean-cast
const $def = (str, def) => (!!str ? str : def);

// get process.env variables with `HYDRA_` prefix
// eslint-disable-next-line jsdoc/require-jsdoc
function getEnvVariables() {
  const processEnv = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in process.env) {
    if (key.startsWith('HYDRA_')) {
      processEnv[key] = process.env[key];
    }
  }
  return processEnv;
}

// default Values
const HYDRA_ENV = 'development';
const HYDRA_MONGO_URL = 'mongodb://127.0.0.1:27017/hydra';
const HYDRA_PORT = '5000';
const HYDRA_JWT_SECRET = 'secret';

const env = getEnvVariables();

export default {
  env,
  HYDRA_ENV: $def(env.HYDRA_ENV, HYDRA_ENV),
  HYDRA_MONGO_URL: $def(env.HYDRA_MONGO_URL, HYDRA_MONGO_URL),
  HYDRA_PORT: $def(env.HYDRA_PORT, HYDRA_PORT),
  HYDRA_JWT_SECRET: $def(env.HYDRA_JWT_SECRET, HYDRA_JWT_SECRET),
};
