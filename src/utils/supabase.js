const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

const supabaseUrl = config.supabase.url;
const supabaseKey = config.supabase.key;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials! Check your .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Supabase client initialized');

module.exports = supabase;
