const express = require('express');
const supabase = require('./supabase-client');
const router = express.Router();

// Shared select string for song queries
const SONG_SELECT = `
    song_id, title, year, bpm, energy, danceability, loudness, liveness,
    valence, duration, acousticness, speechiness, popularity,
    artists!inner (artist_id, artist_name),
    genres!inner (genre_id, genre_name)
`;

// Returns all songs sorted by title
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .order('title', { ascending: true });

    // Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No songs found.' });

    res.json(data);
});

// Returns all songs sorted by specified field
router.get('/sort/:order', async (req, res) => {
    const orderKey = req.params.order.toLowerCase();

    let field;
    let referencedTable = null;

    switch (orderKey) {
        case 'id':
            field = 'song_id';
            break;

        case 'title':
            field = 'title';
            break;

        case 'artist':
            field = 'artist_name';
            referencedTable = 'artists';
            break;

        case 'genre':
            field = 'genre_name';
            referencedTable = 'genres';
            break;

        case 'year':
            field = 'year';
            break;

        case 'duration':
            field = 'duration';
            break;

        default:
            return res.status(400).json({
                error: 'Invalid sort field. Valid options: id, title, artist, genre, year, duration.'
            });
    }

    let query = supabase
        .from('songs')
        .select(SONG_SELECT);

    if (referencedTable) {
        query = query.order(field, {
            referencedTable,
            ascending: true
        });
    } else {
        query = query.order(field, { ascending: true });
    }

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0)
        return res.status(404).json({ error: 'No songs found.' });

    res.json(data);
});

// Returns all songs whose title begins with substring
router.get('/search/begin/:substring', async (req, res) => {
    const substring = req.params.substring;

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .ilike('title', `${substring}%`)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No songs found with title beginning with "${substring}".` });
    }

    res.json(data);
});

// Returns all songs whose title contains substring
router.get('/search/any/:substring', async (req, res) => {
    const substring = req.params.substring;

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .ilike('title', `%${substring}%`)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No songs found containing "${substring}" in title.` });
    }

    res.json(data);
});

// Returns all songs from a specific year
router.get('/search/year/:year', async (req, res) => {
    const year = parseInt(req.params.year);

    // Error handling for when a user enters a non-number
    if (isNaN(year)) {
        return res.status(400).json({ error: 'Invalid year. Must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .eq('year', year)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No songs found for year ${year}.` });
    }

    res.json(data);
});

// Returns all songs by a specific artist
router.get('/artist/:ref', async (req, res) => {
    const artistId = parseInt(req.params.ref);

    if (isNaN(artistId)) {
        return res.status(400).json({ error: 'Invalid artist ID. Must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .eq('artist_id', artistId)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No songs found for artist ID ${artistId}.` });
    }

    res.json(data);
});

// Returns all songs for a specific genre
router.get('/genre/:ref', async (req, res) => {
    const genreId = parseInt(req.params.ref);

    if (isNaN(genreId)) {
        return res.status(400).json({ error: 'Invalid genre ID. Must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .eq('genre_id', genreId)
        .order('title', { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) {
        return res.status(404).json({ error: `No songs found for genre ID ${genreId}.` });
    }

    res.json(data);
});

// Returns single song by song_id
router.get('/:ref', async (req, res) => {
    const songId = parseInt(req.params.ref);

    if (isNaN(songId)) {
        return res.status(400).json({ error: 'Invalid song ID. Must be a number.' });
    }

    const { data, error } = await supabase
        .from('songs')
        .select(SONG_SELECT)
        .eq('song_id', songId)
        .single();

    if (error || !data) {
        return res.status(404).json({ error: `No song found with ID ${songId}.` });
    }

    res.json(data);
});

module.exports = router;