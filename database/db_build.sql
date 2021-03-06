BEGIN;

DROP TABLE IF EXISTS artists, albums CASCADE;

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  discogs_id INT NOT NULL UNIQUE
);

CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year INT NOT NULL,
  type TEXT NOT NULL,
  discogs_id INT NOT NULL UNIQUE,
  spotify_id TEXT DEFAULT NULL,
  spotify_img TEXT DEFAULT NULL,
  artist_id INT REFERENCES artists (discogs_id)
);

INSERT INTO artists (name, discogs_id) VALUES
  ('Hans Zimmer', 59656);
INSERT INTO albums (title, year, type, discogs_id, artist_id) VALUES
  ('The Lion King', 1994, 'Film', 1211512, 59656);

COMMIT;
