#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const { bootstrap, startConsole } = require('@hydra-js/core');

export default () =>
  bootstrap(() => {
    startConsole();
  });
