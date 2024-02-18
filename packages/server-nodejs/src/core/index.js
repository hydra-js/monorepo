require('./config');

const startServer = require('./server');
const { HYDRA_PORT } = require('./config');
const { consoleRouter, defaultRouter } = require('./routes');

const PORT = Number(HYDRA_PORT);

const ports = [PORT];

function getNextPort() {
  const lastUsedPort = ports[ports.length - 1];
  return lastUsedPort + 1;
}

function startConsole() {
  startServer({ namespace: 'console', port: PORT, router: consoleRouter });
}

function startDefaultServer() {
  startServer({
    namespace: 'default',
    port: getNextPort(),
    router: defaultRouter,
  });
}

module.exports = {
  startConsole,
  startDefaultServer,
};
