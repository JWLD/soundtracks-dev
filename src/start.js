const server = require('./server.js');

server.start((err) => {
  if (err) throw err;

  console.log(`Incredible things happening on port ${server.info.port}!`);
});
