-- 1. Create a Songs Table
CREATE TABLE songs (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
    length FLOAT NOT NULL,
    album_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (album_id) REFERENCES albums(id)
);

-- 2. Select only the Names of all the Bands
SELECT bands.name AS 'Band Name'
FROM bands;

-- 3. Get all Bands that have Albums
SELECT * FROM albums ORDER BY release_year LIMIT 1;

-- 4. Select the Oldest Album
SELECT DISTINCT bands.name AS 'band name'
FROM bands
JOIN albums ON bands.id = albums.band_id;

-- 5. Get all Bands that have No Albums
SELECT b.name AS band_name, COUNT(a.id) AS num_albums
FROM bands AS b
LEFT JOIN albums AS a ON b.id = a.band_id
GROUP BY b.id
HAVING num_albums = 0;

-- 6. Get the longest album
SELECT
  albums.name as Name,
  albums.release_year as 'Release Year',
  SUM(songs.length) as 'Duration'
FROM albums
JOIN songs on albums.id = songs.album_id
GROUP BY songs.album_id
ORDER BY Duration DESC
LIMIT 1;