const mongoose = require('mongoose');

const ageGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an age group name'],
        maxLength: [10, 'Name cannot be more than 10 characters']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('AgeGroup', ageGroupSchema);