#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const {
  bootstrap,
  startConsole,
  startDefaultServer,
} = require('@hydra-js/core');

export default async () =>
  bootstrap(() => {
    startConsole();
    startDefaultServer();
  });
