const Club = require('../models/Club');

const getClubs = async (req, res) => {
    try {
        const clubs = await Club.find().sort({ name: 1 });
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createClub = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Please add a club name' });
        }

        const club = await Club.create(req.body);
        res.status(201).json(club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        const updatedClub = await Club.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json(updatedClub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteClub = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        await club.deleteOne();

        res.status(200).json({ id: req.params.id, message: `Club ${club.name} deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getClubs,
    createClub,
    updateClub,
    deleteClub,
};