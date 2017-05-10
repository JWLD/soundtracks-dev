const Request = require('request');

module.exports = {
  path: '/spotify',
  method: 'POST',
  handler: (request, reply) => {
    const data = JSON.parse(request.payload);

    // make request to spotify
    const options = {
      url: `https://api.spotify.com/v1/search?type=album&q=album:${data.album}`,
      json: true
    };

    Request(options, (err, response, body) => {
      if (err) return reply(err);
      console.log(`SEARCH: ${response.body.albums.href}`);

      const topResult = body.albums.items[0];

      if (topResult) {
        return reply({
          id: topResult.id,
          imgUrl: topResult.images[1].url,
          url: topResult.external_urls.spotify
        });
      }

      return reply({ error: 'No Results' });
    });
  }
};
