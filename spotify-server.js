const express = require('express');
const app = express();
require('dotenv').config();

// Root request
//

const artist_routes = require('./scripts/artists-router.js');
const genre_routes = require('./scripts/genres-router.js');
const song_routes = require('./scripts/songs-router.js');

app.use('/api/artists', artist_routes);
app.use('/api/genres', genre_routes);
app.use('/api/songs', song_routes);

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080');

    console.log(`http://localhost:8080/api/artists`);
    console.log(`http://localhost:8080/api/artists/129`);
    console.log(`http://localhost:8080/api/artists/averages/129`);
    console.log(`http://localhost:8080/api/genres`);
    console.log(`http://localhost:8080/api/songs`);
    console.log(`http://localhost:8080/api/songs/sort/artist`);
    console.log(`http://localhost:8080/api/songs/1010`);
    console.log(`http://localhost:8080/api/songs/search/begin/love`);
    console.log(`http://localhost:8080/api/songs/search/any/love`);
    console.log(`http://localhost:8080/api/songs/search/year/2017`);
    console.log(`http://localhost:8080/api/songs/artist/149`);
    console.log(`http://localhost:8080/api/songs/genre/115`);
});
