const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const connectDB = require('./config/db');

if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app = express();

const PORT = process.env.PORT || 5000;

function resolveCorsOrigin() {
    const raw = process.env.CORS_ORIGIN;
    if (raw) {
        const list = raw.split(',').map((s) => s.trim()).filter(Boolean);
        return list.length === 1 ? list[0] : list;
    }
    return 'http://localhost:5173';
}

app.use(cors({
    origin: resolveCorsOrigin(),
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/agegroups', require('./routes/ageGroupRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
    const rawStatus = err.statusCode ?? err.status;
    const statusCode =
        typeof rawStatus === 'number' &&
        rawStatus >= 400 &&
        rawStatus < 600
            ? rawStatus
            : 500;
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