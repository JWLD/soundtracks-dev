const dbQueries = {};

// add artist name and id where it doesn't already exist
dbQueries.addArtist = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO artists (name, discogs_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT discogs_id FROM artists WHERE discogs_id = $2)',
    [data.name, data.id],
    callback
  );
};

module.exports = dbQueries;
