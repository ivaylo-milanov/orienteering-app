const express = require('express');
const router = express.Router();
const {
    getAgeGroups,
    createAgeGroup,
    updateAgeGroup,
    deleteAgeGroup
} = require('../controllers/ageGroupController');

const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(getAgeGroups)
    .post(protect, authorize('admin'), createAgeGroup);

router.route('/:id')
    .put(protect, authorize('admin'), updateAgeGroup)
    .delete(protect, authorize('admin'), deleteAgeGroup);

module.exports = router;