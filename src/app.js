const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
const routes = require('./routes');
app.use('/api', routes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SIAP Admin API is running' });
});

// Serve index.html for root route and all other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
