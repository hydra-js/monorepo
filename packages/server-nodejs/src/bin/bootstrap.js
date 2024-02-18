#!/user/bin/env node
import 'core-js/stable';
import 'regenerator-runtime/runtime';

require('dotenv').config();

const { startConsole, startDefaultServer } = require('core');

const bootstrap = () => {
  startConsole();
  startDefaultServer();
};

bootstrap();
