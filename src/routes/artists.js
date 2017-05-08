const Qs = require('querystring');
const Request = require('request');

const compileHtml = require('../compile');

/* Make request to Discogs API for artists, and return top 3 results as html */
module.exports = {
  path: '/artists',
  method: 'GET',
  handler: (request, reply) => {
    // build discogs request
    const queries = Qs.stringify({
      type: 'artist',
      q: request.query.q,
      token: process.env.DISCOGS_TOKEN
    });
    const options = {
      url: `https://api.discogs.com/database/search?${queries}`,
      headers: { 'User-Agent': 'https://github.com/JWLD' },
      json: true
    };

    // make request for artists
    Request(options, (error, response, body) => {
      if (error) return reply(`ERROR: ${error}`);

      // compile and return html partial using top n results
      const topResults = body.results.slice(0, 3);
      const html = compileHtml('artist-list', topResults);

      return reply(html);
    });
  }
};
