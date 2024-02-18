require('./config');

const startServer = require('./server');
const { HYDRA_PORT } = require('./config');

const PORT = Number(HYDRA_PORT);

const ports = [PORT];

function getNextPort() {
  const lastUsedPort = ports[ports.length - 1];
  return lastUsedPort + 1;
}

function startConsole() {
  startServer({ port: PORT, namespace: 'console' });
}

function startDefaultServer() {
  startServer({ port: getNextPort(), namespace: 'default' });
}

module.exports = {
  startConsole,
  startDefaultServer,
};
