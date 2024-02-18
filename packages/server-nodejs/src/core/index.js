const startServer = require('./server');

function startConsole() {
  startServer({ port: 3000, namespace: 'console' });
}

function startDefaultServer() {
  startServer({ port: 3001, namespace: 'default' });
}

module.exports = {
  startConsole,
  startDefaultServer,
};
