const Request = require('request');

const connPool = require('../../database/db_connect');
const dbQueries = require('../db_queries');
const compileHtml = require('../compile');

const getAlbumsFromDiscogs = (artistId, reply) => {
  // build discogs request
  const options = {
    url: `https://api.discogs.com/artists/${artistId}/releases?per_page=100`,
    headers: { 'User-Agent': 'https://github.com/JWLD' },
    json: true
  };

  // make request to discogs
  Request(options, (error, response, body) => {
    if (error) return reply(error);

    // filter function - only albums where role is 'Main'
    function roleIsMain(release) {
      return release.role === 'Main';
    }

    // process returned data - body.releases is an array of objects
    const releases = body.releases.filter(roleIsMain).map((release) => {
      const newObj = release;
      // set main_release to id where main_release isn't included
      if (!newObj.main_release) {
        newObj.main_release = release.id;
      }
      return newObj;
    });

    // compile and return html using partial
    const html = compileHtml('album-list', { releases, artistId });
    return reply(html);
  });
};

module.exports = {
  path: '/albums',
  method: 'POST',
  handler: (request, reply) => {
    const data = JSON.parse(request.payload);

    // run query to add artist to DB
    dbQueries.addArtist(connPool, data, (err) => {
      if (err) return console.log(`ERROR: ${err}`);

      // query Discogs for albums using artist id
      return getAlbumsFromDiscogs(data.id, reply);
    });
  }
};
