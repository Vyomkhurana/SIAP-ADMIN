const express = require('express');
const router = express.Router();

const {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplicationStatus,
    deleteApplication
} = require('../controllers/applicationController');

router.get('/', getAllApplications);
router.get('/:id', getApplicationById);
router.post('/', createApplication);
router.patch('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

module.exports = router;
