const AgeGroup = require('../models/AgeGroup');

const getAgeGroups = async (req, res) => {
    try {
        const groups = await AgeGroup.find().sort({ name: 1 });
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAgeGroup = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const group = await AgeGroup.create(req.body);
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAgeGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const ageGroup = await AgeGroup.findById(id);
        if (!ageGroup) {
            return res.status(404).json({ message: 'Age group not found' });
        }

        const updatedGroup = await AgeGroup.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAgeGroup = async (req, res) => {
    try {
        const ageGroup = await AgeGroup.findById(req.params.id);

        if (!ageGroup) {
            return res.status(404).json({ message: 'Age group not found' });
        }

        await ageGroup.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Age group deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAgeGroups,
    createAgeGroup,
    updateAgeGroup,
    deleteAgeGroup,
};