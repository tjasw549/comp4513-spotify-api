const express = require('express');
const supabase = require('./supabase-client');
const router = express.Router();

const SONG_SELECT = `
    song_id, title, year, bpm, energy, danceability, loudness, liveness,
    valence, duration, acousticness, speechiness, popularity,
    artists!inner (artist_id, artist_name),
    genres!inner (genre_id, genre_name)
`;

// Returns a valid integer between 1 and 20, defaulting to 20 if invalid.
const parseLimit = (ref) => {
    const num = parseInt(ref);
    if (!ref || isNaN(num) || num < 1 || num > 20) return 20;
    return num;
};

// Returns the top songs by danceability (desc)
router.get('/dancing/:ref', async (req, res) => {
    const limit = parseLimit(req.params.ref);

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .order('danceability', { ascending: false })
        .limit(limit);

    // Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No songs found.' });

    res.json(data);
});

// Returns the top songs by valence (desc)
router.get('/happy/:ref', async (req, res) => {
    const limit = parseLimit(req.params.ref);

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .order('valence', { ascending: false })
        .limit(limit);

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No songs found.' });

    res.json(data);
});

// Returns the top songs by liveness/acousticness ratio (desc)
router.get('/coffee/:ref', async (req, res) => {
    const limit = parseLimit(req.params.ref);

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT);

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No songs found.' });

    const sorted = data
        .filter(s => s.acousticness > 0) // Avoid dividing by 0
        .sort((a, b) => (b.liveness / b.acousticness) - (a.liveness / a.acousticness))
        .slice(0, limit);

    res.json(sorted);
});

// Returns the top songs by energy * speechiness (asc)
router.get('/studying/:ref', async (req, res) => {
    const limit = parseLimit(req.params.ref);

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT);

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No songs found.' });

    const sorted = data
        .sort((a, b) => (a.energy * a.speechiness) - (b.energy * b.speechiness))
        .slice(0, limit);

    res.json(sorted);
});

module.exports = router;