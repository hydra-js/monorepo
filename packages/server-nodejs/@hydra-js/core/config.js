const path = require('node:path');
const dotenv = require('dotenv');

const config = dotenv.config();
if (config.error) throw config.error;

const { parsed: envs } = config;

const rootDir = path.join(__dirname, '..', '..');
const publicDir = path.join(rootDir, 'public');
const templateDir = path.join(rootDir, 'views');
const layoutDir = path.join(templateDir, '_layouts');
const indexLayoutPath = path.join(layoutDir, 'index.html');
const apiDir = path.join(rootDir, 'api');

export default {
  ...envs,
  CONTEXT: {
    rootDir,
    publicDir,
    templateDir,
    layoutDir,
    indexLayoutPath,
    apiDir
  },
};
