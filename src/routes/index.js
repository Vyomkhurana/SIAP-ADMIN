const express = require('express');
const router = express.Router();

// API Routes will be added here when we work on backend

router.get('/test', (req, res) => {
  res.json({ 
    message: 'SIAP Admin API is working!',
    timestamp: new Date().toISOString()
  });
});

router.use('/companies', require('./companyRoutes'));
router.use('/students', require('./studentRoutes'));
router.use('/applications', require('./applicationRoutes'));

module.exports = router;
