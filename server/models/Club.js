const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a club name'],
        maxLength: [50, 'Name cannot be more than 50 characters']
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Club', clubSchema);