const dbQueries = {};

// add artist name and id where it doesn't already exist
dbQueries.addArtist = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO artists (name, discogs_id) SELECT $1, $2 WHERE NOT EXISTS (SELECT discogs_id FROM artists WHERE discogs_id = $2)',
    [
      data.name,
      data.id
    ],
    callback
  );
};

// add album
dbQueries.addAlbum = (connPool, data, callback) => {
  connPool.query(
    'INSERT INTO albums (title, year, type, discogs_id, spotify_id, spotify_img, artist_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [
      data.title,
      data.year,
      data.type,
      data.discogs_id,
      data.spotify_id,
      data.spotify_img,
      data.artist_id
    ],
    callback
  );
};

module.exports = dbQueries;
