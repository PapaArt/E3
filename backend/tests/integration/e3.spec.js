const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('E3', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new E3', async () => {
        const response = await request(app)
        .post('/e3')
        .send({
            name: "Ubisoft2",
            email: "contact@gmail.com",
            whatsapp: "46846815345",
            city: "Los angeles",
            uf: "LA"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});