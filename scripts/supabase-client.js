const supa = require('@supabase/supabase-js');
require('dotenv').config();

const supaUrl = process.env.SUPABASE_URL;
const supaAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = supa.createClient(supaUrl, supaAnonKey);

module.exports = supabase;
