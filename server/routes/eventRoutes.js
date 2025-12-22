const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect, authorize, bindClubOwnership } = require('../middleware/authMiddleware');

router.route('/')
    .get(getEvents)
    .post(
        protect,
        authorize('admin', 'trainer'),
        bindClubOwnership,
        createEvent
    );

router.route('/:id')
    .get(getEvent)
    .put(
        protect, 
        authorize('admin', 'trainer'), 
        bindClubOwnership,
        updateEvent
    )
    .delete(
        protect, 
        authorize('admin', 'trainer'), 
        deleteEvent
    );

module.exports = router;