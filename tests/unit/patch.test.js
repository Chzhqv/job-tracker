const request = require('supertest');
const app = require('../../src/app');

describe('PATCH /v1/applications/:id', () => {
  test('updates the status', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .send({ company: 'Umbrella', role: 'DevOps' });

    const id = created.body.application.id;

    const res = await request(app)
      .patch(`/v1/applications/${id}`)
      .send({ status: 'interview' });

    expect(res.statusCode).toBe(200);
    expect(res.body.application.status).toBe('interview');
    expect(res.body.application.company).toBe('Umbrella');
  });
});
