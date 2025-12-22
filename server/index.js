const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./config/db');

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/agegroups', require('./routes/ageGroupRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server started on port ${PORT}`);
    });
}

module.exports = app;