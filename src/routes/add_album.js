const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');

module.exports = {
  path: '/add',
  method: 'POST',
  handler: (request, reply) => {
    dbQueries.addAlbum(connPool, JSON.parse(request.payload), (err, res) => {
      if (err) return reply(`ERROR ADDING ALBUM: ${err}`);
      return reply(res);
    });
  }
};
