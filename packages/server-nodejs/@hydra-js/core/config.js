const path = require('node:path');
const dotenv = require('dotenv');

const config = dotenv.config();
if (config.error) throw config.error;

const { parsed: envs } = config;

const rootDir = path.join(__dirname, '..', '..');
const templateDir = path.join(rootDir, 'views');
const layoutDir = path.join(rootDir, 'views', '_layouts');
const publicDir = path.join(rootDir, 'public');
const indexLayout = path.join(rootDir, 'views', '_layouts', 'index.html');

export default {
  ...envs,
  CONTEXT: {
    rootDir,
    publicDir,
    templateDir,
    layoutDir,
    indexLayout,
  },
};
