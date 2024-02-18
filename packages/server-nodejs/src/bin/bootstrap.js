#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { startConsole, startDefaultServer } = require('@hydra-js/core');

export const bootstrap = () => {
  startConsole();
  startDefaultServer();
};
