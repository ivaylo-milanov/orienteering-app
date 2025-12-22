const request = require('supertest');
const app = require('../index'); 
const Club = require('../models/Club');
const mongoose = require('mongoose');

require('./setup');

const validClub = {
    name: 'Compass Point Orienteering' 
};

describe('Club API Integration Tests', () => {
    describe('POST /api/clubs', () => {
        it('should create a new club successfully', async () => {
            const res = await request(app)
                .post('/api/clubs')
                .send(validClub);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(validClub.name);
            expect(res.body).toHaveProperty('_id');
        });

        it('should fail if name is missing', async () => {
            const res = await request(app)
                .post('/api/clubs')
                .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toMatch(/please add a club name/i);
        });

        it('should fail if name exceeds 50 characters', async () => {
            const longName = 'A'.repeat(51); 

            const res = await request(app)
                .post('/api/clubs')
                .send({ name: longName });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/name cannot be more than/i);
        });
    });

    describe('GET /api/clubs', () => {
        it('should return all clubs sorted by name (A-Z)', async () => {
            await Club.create({ name: 'Zebra Club' });
            await Club.create({ name: 'Alpha Club' });
            await Club.create({ name: 'Beta Club' });

            const res = await request(app).get('/api/clubs');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(3);
            
            expect(res.body[0].name).toBe('Alpha Club');
            expect(res.body[1].name).toBe('Beta Club');
            expect(res.body[2].name).toBe('Zebra Club');
        });
    });

    describe('PUT /api/clubs/:id', () => {
        it('should update a club successfully', async () => {
            const club = await Club.create(validClub);
            const newName = 'Northern Navigators';

            const res = await request(app)
                .put(`/api/clubs/${club._id}`)
                .send({ name: newName });

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(newName);
        });

        it('should return 404 for non-existent club', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .put(`/api/clubs/${fakeId}`)
                .send({ name: 'Ghost Club' });

            expect(res.statusCode).toBe(404);
        });

        it('should fail validation on update if name is too long', async () => {
            const club = await Club.create(validClub);
            const longName = 'B'.repeat(51);

            const res = await request(app)
                .put(`/api/clubs/${club._id}`)
                .send({ name: longName });

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/name cannot be more than/i);
        });
    });

    describe('DELETE /api/clubs/:id', () => {
        it('should delete a club', async () => {
            const club = await Club.create(validClub);

            const res = await request(app).delete(`/api/clubs/${club._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toMatch(/deleted/i);

            const dbClub = await Club.findById(club._id);
            expect(dbClub).toBeNull();
        });

        it('should return 404 if trying to delete non-existent club', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).delete(`/api/clubs/${fakeId}`);

            expect(res.statusCode).toBe(404);
        });
    });
});