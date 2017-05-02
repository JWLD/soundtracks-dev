const Hapi = require('hapi');
const Inert = require('inert');

const routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000
});

server.register(Inert, (err) => {
  if (err) throw err;

  server.route(routes);
});

module.exports = server;
