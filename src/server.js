const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Handlebars = require('handlebars');
const Path = require('path');

const routes = require('./routes');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000
});

server.register([Inert, Vision], (err) => {
  if (err) throw err;

  server.route(routes);

  server.views({
    engines: {
      hbs: Handlebars
    },
    relativeTo: Path.join(__dirname, 'handlebars'),
    layoutPath: './layouts',
    layout: 'default',
    path: './views',
    partialsPath: './partials',
    helpersPath: './helpers'
  });
});

module.exports = server;
