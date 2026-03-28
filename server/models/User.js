const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxLength: [50, 'Name cannot exceed 50 characters'],
        minLength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
        validate: {
            validator: function(value) {
                if (!this.isModified('password')) return true;

                return /^(?=.*[a-zA-Z])(?=.*\d)/.test(value);
            },
            message: 'Password must contain at least one letter and one number'
        }
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'trainer', 'admin'],
        },
        default: 'user'
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: [true, 'Please add a club id'],
    },
    ageGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AgeGroup',
    },
    chipNumber: {
        type: String,
        trim: true,
        maxLength: [50, 'Chip number cannot exceed 50 characters'],
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);