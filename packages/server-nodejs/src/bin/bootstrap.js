#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

require('dotenv').config();

const { startConsole, startDefaultServer } = require('@hydra-js/core');

export const bootstrap = () => {
  startConsole();
  startDefaultServer();
};
