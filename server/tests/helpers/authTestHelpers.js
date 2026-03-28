const request = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Club = require('../../models/Club');

/**
 * Test auth options (tradeoffs):
 *
 * 1. Real JWT + User in DB (this file) — exercises protect(), JWT shape, and
 *    authorize() exactly like production. Needs a user row because protect()
 *    loads User.findById(decoded.id).
 *
 * 2. jest.mock('../middleware/authMiddleware') — stub protect to set req.user
 *    and call next(). Least boilerplate, but mutations are no longer proof that
 *    JWT parsing and role checks work; use only if you add separate tests for
 *    the middleware itself.
 *
 * 3. Signing a token without a user — fails at runtime: protect returns 401
 *    after verify because the user document is missing.
 */

/**
 * Supertest requests with Authorization: Bearer <token> pre-applied.
 * Use with a token from createAdminUserWithToken() (or login in a test).
 */
function authenticated(app, token) {
    const headers = { Authorization: `Bearer ${token}` };
    return {
        get: (path) => request(app).get(path).set(headers),
        post: (path) => request(app).post(path).set(headers),
        put: (path) => request(app).put(path).set(headers),
        delete: (path) => request(app).delete(path).set(headers),
    };
}

/**
 * Creates an admin user (authorized for admin-only and trainer/admin routes)
 * and a signed JWT matching authController / protect ({ id } payload).
 */
async function createAdminUserWithToken(overrides = {}) {
    const club = await Club.create({
        name: overrides.clubName ?? 'Event test club',
    });

    const user = await User.create({
        name: overrides.name ?? 'Event test admin',
        email: overrides.email ?? `event-admin-${Date.now()}@example.com`,
        password: overrides.password ?? 'Password123',
        club: club._id,
        role: 'admin',
    });

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return { token, user, club };
}

/**
 * Creates a trainer user and JWT (same shape as production login/register).
 */
async function createTrainerUserWithToken(overrides = {}) {
    const club =
        overrides.club ??
        (await Club.create({
            name: overrides.clubName ?? 'Trainer test club',
        }));

    const clubId = club._id ?? club;

    const user = await User.create({
        name: overrides.name ?? 'Event test trainer',
        email: overrides.email ?? `event-trainer-${Date.now()}@example.com`,
        password: overrides.password ?? 'Password123',
        club: clubId,
        role: 'trainer',
    });

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return { token, user, club };
}

module.exports = { authenticated, createAdminUserWithToken, createTrainerUserWithToken };
