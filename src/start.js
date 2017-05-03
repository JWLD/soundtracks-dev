const server = require('./server.js');
require('env2')('config.env');

server.start((err) => {
  if (err) throw err;

  console.log(`Incredible things happening on port ${server.info.port}!`);
});
