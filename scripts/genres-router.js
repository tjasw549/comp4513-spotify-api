const express = require('express');
const supabase = require('./supabase-client.js');
const router = express.Router();

// Returns all the genres
router.get('/', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select('*')
        .order('genre_id', { ascending: true });

    // Error handling
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return res.status(404).json({ error: 'No genres found.' });

    res.json(data);
});

module.exports = router;
