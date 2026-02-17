const express = require('express');
const app = express();
require('dotenv').config();


const genre_routes = require('./scripts/genres-router.js');

app.use('/api/genres', genre_routes);

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080');
});
