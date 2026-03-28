const request = require('supertest');
const app = require('../index');
const User = require('../models/User');
const Club = require('../models/Club');

require('./setup');

describe('Auth API Integration Tests', () => {
    let validUser;

    beforeEach(async () => {
        const club = await Club.create({ name: 'Test Club' });
        validUser = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'Password123',
            club: club._id.toString(),
        };
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send(validUser);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(validUser.name);
            expect(res.body.email).toBe(validUser.email.toLowerCase());
            expect(res.body).toHaveProperty('accessToken');
            expect(res.body).not.toHaveProperty('password');
        });

        it('should fail if email is already taken', async () => {
            await User.create(validUser);

            const res = await request(app)
                .post('/api/auth/register')
                .send(validUser);

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toMatch(/user already exists/i);
        });

        it('should fail if password is too weak (Complexity Check)', async () => {
            const weakUser = {
                name: 'Weak User',
                email: 'weak@example.com',
                password: 'pass',
                club: validUser.club,
            };

            const res = await request(app)
                .post('/api/auth/register')
                .send(weakUser);

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/password/i);
        });

        it('should sanitize email (lowercase & trim)', async () => {
            const messyUser = {
                name: 'Messy',
                email: '  MESSY@Example.COM  ',
                password: 'Password123',
                club: validUser.club,
            };

            const res = await request(app)
                .post('/api/auth/register')
                .send(messyUser);

            expect(res.statusCode).toBe(201);
            
            const dbUser = await User.findOne({ email: 'messy@example.com' });
            expect(dbUser).not.toBeNull();
            expect(dbUser.email).toBe('messy@example.com');
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login successfully with correct credentials', async () => {
            await User.create(validUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: validUser.email,
                    password: validUser.password
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('accessToken');
            expect(res.body.email).toBe(validUser.email);
        });

        it('should fail with incorrect password', async () => {
            await User.create(validUser);

            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: validUser.email,
                    password: 'WrongPassword123'
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toMatch(/invalid credentials/i);
        });

        it('should fail if email does not exist', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'ghost@example.com',
                    password: 'Password123'
                });

            expect(res.statusCode).toBe(401);
        });
    });

    describe('GET /api/auth/me', () => {
        it('should access protected route with valid token', async () => {
            const registerRes = await request(app)
                .post('/api/auth/register')
                .send(validUser);
            
            const token = registerRes.body.accessToken;

            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.email).toBe(validUser.email);
            expect(res.body).not.toHaveProperty('password');
        });

        it('should deny access without token', async () => {
            const res = await request(app)
                .get('/api/auth/me');

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toMatch(/not authorized/i);
        });

        it('should deny access with invalid token', async () => {
            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', 'Bearer invalid_token_123');

            expect(res.statusCode).toBe(401);
        });
    });
});