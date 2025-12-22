const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an event name'],
        minLength: [3, 'Event name must be at least 3 characters'],
        maxLength: [100, 'Event name cannot exceed 100 characters']
    },
    date: {
        type: Date,
        required: [true, 'Please add the main event date'],
        min: ['2000-01-01', 'Date is too old'],
        max: ['2030-12-31', 'Event cannot be scheduled beyond the year 2030']
    },
    registrationDeadline: {
        type: Date,
        required: [true, 'Please add a registration deadline'],
        validate: {
            validator: function(value) {
                return value < this.date;
            },
            message: 'Registration deadline must be before the event start date'
        }
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'Please assign a club to this event']
    },
    stages: {
        type: [{
            name: { 
                type: String, 
                required: [true, 'Stage name is required']
            },
            date: { 
                type: Date, 
                required: [true, 'Stage date is required'] 
            }
        }],
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'An event must have at least one stage'
        }
    },
    ageGroups: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AgeGroup'
        }],
        validate: {
            validator: function(v) {
                const uniqueIds = new Set(v.map(id => id.toString()));
                return uniqueIds.size === v.length;
            },
            message: 'Duplicate age groups are not allowed in the same event'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);