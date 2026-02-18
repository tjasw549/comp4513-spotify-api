const express = require('express');
const supabase = require('./supabase-client');
const router = express.Router();

// Returns all songs for a specific playlist
router.get('/:ref', async (req, res) => {
    const playlistId = parseInt(req.params.ref);

    // Error handling for inputs that are not a number
    if (isNaN(playlistId)) {
        return res.status(400).json({ error: 'Invalid playlist ID. Must be a number.' });
    }

    // Join playlists to songs to artists & genres
    const { data, error } = await supabase
        .from('playlists')
        .select(`
            playlist_id,
            songs!inner (
                song_id,
                title,
                year,
                artists!inner (artist_name),
                genres!inner (genre_name)
            )
        `)
        .eq('playlist_id', playlistId);

    // Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No playlist found with ID ${playlistId}.` });
    }

    // Flattens the nested objects to make a flat array of objects
    const result = data.map(row => ({
        playlist:    row.playlist_id,
        song_id:     row.songs.song_id,
        title:       row.songs.title,
        artist_name: row.songs.artists.artist_name,
        genre_name:  row.songs.genres.genre_name,
        year:        row.songs.year,
    }));

    res.json(result);
});

module.exports = router;
