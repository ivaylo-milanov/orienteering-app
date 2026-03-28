const request = require('supertest');
const app = require('../index');
const AgeGroup = require('../models/AgeGroup');
const mongoose = require('mongoose');
const { authenticated, createAdminUserWithToken } = require('./helpers/authTestHelpers');

require('./setup');

const validAgeGroup = {
    name: 'M21'
};

describe('AgeGroup API Integration Tests', () => {
    let authToken;

    beforeEach(async () => {
        const { token } = await createAdminUserWithToken();
        authToken = token;
    });

    describe('POST /api/agegroups', () => {
        it('should create a new age group successfully', async () => {
            const res = await authenticated(app, authToken).post('/api/agegroups').send(validAgeGroup);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe('M21');
            expect(res.body).toHaveProperty('_id');
        });

        it('should fail if name is missing', async () => {
            const res = await authenticated(app, authToken).post('/api/agegroups').send({});

            expect(res.statusCode).toBe(400); 
            expect(res.body.message).toBe('Name is required');
        });

        it('should fail if name is longer than 10 characters', async () => {
            const longNameGroup = { name: 'Super Long Name 123' }; 

            const res = await authenticated(app, authToken)
                .post('/api/agegroups')
                .send(longNameGroup);

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/name cannot be more than 10 characters/i);
        });

        it('should return 401 without Authorization header', async () => {
            const res = await request(app).post('/api/agegroups').send(validAgeGroup);

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toMatch(/not authorized/i);
        });
    });

    describe('GET /api/agegroups', () => {
        it('should return all age groups sorted by name (A-Z)', async () => {
            await AgeGroup.create({ name: 'W21' });
            await AgeGroup.create({ name: 'M21' });
            await AgeGroup.create({ name: 'A10' });

            const res = await request(app).get('/api/agegroups');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(3);
            
            expect(res.body[0].name).toBe('A10');
            expect(res.body[1].name).toBe('M21');
            expect(res.body[2].name).toBe('W21');
        });
    });

    describe('PUT /api/agegroups/:id', () => {
        it('should update an age group successfully', async () => {
            const group = await AgeGroup.create(validAgeGroup);
            const newName = 'M40';

            const res = await authenticated(app, authToken)
                .put(`/api/agegroups/${group._id}`)
                .send({ name: newName });

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(newName);
        });

        it('should return 404 for non-existent group', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await authenticated(app, authToken)
                .put(`/api/agegroups/${fakeId}`)
                .send({ name: 'M55' });

            expect(res.statusCode).toBe(404);
        });

        it('should fail validation on update if name is too long', async () => {
            const group = await AgeGroup.create(validAgeGroup);

            const res = await authenticated(app, authToken)
                .put(`/api/agegroups/${group._id}`)
                .send({ name: 'This Name Is Way Too Long' });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/more than 10 characters/i);
        });
    });

    describe('DELETE /api/agegroups/:id', () => {
        it('should delete an age group', async () => {
            const group = await AgeGroup.create(validAgeGroup);

            const res = await authenticated(app, authToken).delete(`/api/agegroups/${group._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Age group deleted');

            const dbGroup = await AgeGroup.findById(group._id);
            expect(dbGroup).toBeNull();
        });

        it('should return 404 if trying to delete non-existent group', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await authenticated(app, authToken).delete(`/api/agegroups/${fakeId}`);

            expect(res.statusCode).toBe(404);
        });
    });
});