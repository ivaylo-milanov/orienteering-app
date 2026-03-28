const Event = require('../models/Event');

const APIFeatures = require('../utils/APIFeatures');

const assertTrainerOwnsEvent = (req, event) => {
    if (req.user.role !== 'trainer') {
        return true;
    }
    return event.club.equals(req.user.club);
};

const getEvents = async (req, res) => {
    try {
        const populateConfig = [
            { path: 'club', select: 'name' }
        ];

        const features = new APIFeatures(Event.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate()
            .conditionalPopulate(populateConfig);

        const events = await features.query;

        res.status(200).json({
            count: events.length,
            page: parseInt(req.query.page) || 1,
            events
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('club', 'name')
            .populate('ageGroups');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json(event);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!assertTrainerOwnsEvent(req, event)) {
            return res.status(403).json({ message: 'Not authorized to modify this event' });
        }

        event.set(req.body);

        const updatedEvent = await event.save();

        res.status(200).json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (!assertTrainerOwnsEvent(req, event)) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await event.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
};