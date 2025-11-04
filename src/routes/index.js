const express = require('express');
const router = express.Router();

// API Routes will be added here when we work on backend

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'API Routes working',
    timestamp: new Date().toISOString()
  });
});

// Future routes structure:
// router.use('/auth', require('./auth'));
// router.use('/applications', require('./applications'));
// router.use('/students', require('./students'));
// router.use('/companies', require('./companies'));

module.exports = router;
