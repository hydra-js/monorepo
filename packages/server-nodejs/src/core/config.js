require('dotenv').config();

function getCustomEnvVariables() {
  const processEnv = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in process.env) {
    if (key.startsWith('HYDRA_')) {
      processEnv[key] = process.env[key];
    }
  }
  return processEnv;
}

module.exports = getCustomEnvVariables();
