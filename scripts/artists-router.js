const express = require('express');
const supabase = require('./supabase-client.js');
const router = express.Router();

// Shared select string for artist queries
const ARTIST_SELECT = `
    artist_id,
    artist_name,
    types (type_name),
    artist_image_url,
    spotify_url,
    spotify_desc
`;

// Returns all artists sorted by artist_name
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select(ARTIST_SELECT)
        .order('artist_name', { ascending: true });

    // Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No artists found.' });

    res.json(data);
});

// Returns the average values for a specific artist
router.get('/averages/:ref', async (req, res) => {
    const artistId = parseInt(req.params.ref);

    // Error handling for when a user enters a non-number
    if (isNaN(artistId)) {
        return res.status(400).json({ error: 'Invalid artist ID. Must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(`
            bpm, energy, danceability, loudness, liveness,
            valence, duration, acousticness, speechiness, popularity
        `)
        // fetch only songs made by the specific artist
        .eq('artist_id', artistId);

    // Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No songs found for artist ID ${artistId}.` });
    }

    // Number of songs made by the artist
    const count = data.length;

    // Calculates the average for a given field (e.g. 'bpm') across all the artists songs
    const avg = (field) =>
        parseFloat((data.reduce((sum, row) => 
            sum + (row[field] || 0), 0) / count).toFixed(2));

    const averages = {
        artist_id:    artistId,
        song_count:   count,
        bpm:          avg('bpm'),
        energy:       avg('energy'),
        danceability: avg('danceability'),
        loudness:     avg('loudness'),
        liveness:     avg('liveness'),
        valence:      avg('valence'),
        duration:     avg('duration'),
        acousticness: avg('acousticness'),
        speechiness:  avg('speechiness'),
        popularity:   avg('popularity'),
    };

    res.json(averages);
});

// Returns the specified artist based on artist_id
router.get('/:ref', async (req, res) => {
    const artistId = parseInt(req.params.ref);

    // Error handling for when a user enters a non-number
    if (isNaN(artistId)) {
        return res.status(400).json({ error: 'Invalid artist ID. Must be a number.' });
    }

    const { data, error } = await supabase
        .from('artists')
        .select(ARTIST_SELECT)
        .eq('artist_id', artistId)
        .single();

    // Error handling
    if (error || !data) {
        return res.status(404).json({ error: `No artist found with ID ${artistId}.` });
    }

    res.json(data);
});

module.exports = router;