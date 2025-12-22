const request = require('supertest');
const app = require('../index'); 
const Event = require('../models/Event');
const mongoose = require('mongoose');

require('./setup');

const mockClubId = new mongoose.Types.ObjectId();
const mockAgeGroupId = new mongoose.Types.ObjectId();

const validEventData = {
    name: 'Spring Orienteering Cup 2025',
    date: new Date('2025-06-01').toISOString(),
    registrationDeadline: new Date('2025-05-20').toISOString(),
    clubId: mockClubId,
    ageGroups: [mockAgeGroupId],
    stages: [
        { name: 'Sprint Qualification', date: new Date('2025-06-01').toISOString() },
        { name: 'Middle Distance', date: new Date('2025-06-02').toISOString() }
    ]
};

describe('Event API Integration Tests', () => {
    describe('POST /api/events', () => {
        it('should create a new event successfully', async () => {
            const res = await request(app)
                .post('/api/events')
                .send(validEventData);

            expect(res.statusCode).toBe(201);
            expect(res.body.name).toBe(validEventData.name);
            expect(res.body.stages.length).toBe(2);
            expect(res.body.stages[0]).toHaveProperty('name', 'Sprint Qualification');
        });

        it('should fail if stages array is empty', async () => {
            const invalidData = { ...validEventData, stages: [] };

            const res = await request(app)
                .post('/api/events')
                .send(invalidData);

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/must have at least one stage/i);
        });

        it('should fail if required fields are missing', async () => {
            const res = await request(app)
                .post('/api/events')
                .send({ name: 'Incomplete Event' });

            expect(res.statusCode).toBe(500);
            expect(res.body).toHaveProperty('message');
        });

        it('should fail if deadline is after the date (Schema Validation)', async () => {
            const invalidData = {
                ...validEventData,
                date: new Date('2025-06-01'),
                registrationDeadline: new Date('2025-06-02')
            };

            const res = await request(app)
                .post('/api/events')
                .send(invalidData);

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toMatch(/deadline must be before/i);
        });
    });

    describe('GET /api/events', () => {
        it('should return all events', async () => {
            await Event.create(validEventData);
            await Event.create({ ...validEventData, name: 'Summer Cup' });

            const res = await request(app).get('/api/events');

            expect(res.statusCode).toBe(200);
            expect(res.body.count).toBe(2);
        });

        it('should filter events by name', async () => {
            await Event.create(validEventData); 
            await Event.create({ ...validEventData, name: 'Winter Cup' });

            const res = await request(app).get('/api/events?name=Winter Cup');

            expect(res.statusCode).toBe(200);
            expect(res.body.count).toBe(1);
            expect(res.body.events[0].name).toBe('Winter Cup');
        });

        it('should limit fields correctly', async () => {
            await Event.create(validEventData);

            const res = await request(app).get('/api/events?fields=name,date');
            
            expect(res.statusCode).toBe(200);
            const event = res.body.events[0];
            expect(event).toHaveProperty('name');
            expect(event).not.toHaveProperty('stages');
        });
    });

    describe('GET /api/events/:id', () => {
        it('should return a single event by ID', async () => {
            const event = await Event.create(validEventData);

            const res = await request(app).get(`/api/events/${event._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(event.name);
        });

        it('should return 404 if event not found', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/events/${fakeId}`);

            expect(res.statusCode).toBe(404);
        });

        it('should return 500 for invalid ID format', async () => {
            const res = await request(app).get('/api/events/invalid-id-123');
            expect(res.statusCode).toBe(500);
        });
    });

    describe('PUT /api/events/:id', () => {
        it('should update an event successfully', async () => {
            const event = await Event.create(validEventData);
            const newName = 'Updated Spring Cup';

            const res = await request(app)
                .put(`/api/events/${event._id}`)
                .send({ name: newName });

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(newName);
        });

        it('should respect schema validation on update (Date Logic)', async () => {
            const event = await Event.create(validEventData);
            
            const res = await request(app)
                .put(`/api/events/${event._id}`)
                .send({ 
                    registrationDeadline: new Date('2025-06-05') 
                });

            expect(res.statusCode).not.toBe(200); 
            expect(res.body.message).toMatch(/deadline must be before/i);
        });
    });

    describe('DELETE /api/events/:id', () => {
        it('should delete an event', async () => {
            const event = await Event.create(validEventData);

            const res = await request(app).delete(`/api/events/${event._id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Event deleted');

            const dbEvent = await Event.findById(event._id);
            expect(dbEvent).toBeNull();
        });

        it('should return 404 for non-existent event', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).delete(`/api/events/${fakeId}`);

            expect(res.statusCode).toBe(404);
        });
    });
});