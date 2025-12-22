const express = require('express');
const router = express.Router();
const {
    getClubs,
    createClub,
    updateClub,
    deleteClub
} = require('../controllers/clubController');

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getClubs)
    .post(protect, authorize('admin'), createClub);

router.route('/:id')
    .put(protect, authorize('admin'), updateClub)
    .delete(protect, authorize('admin'), deleteClub);

module.exports = router;