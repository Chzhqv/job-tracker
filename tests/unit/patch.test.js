const request = require('supertest');
const app = require('../../src/app');

describe('PATCH /v1/applications/:id', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ username: 'alice', password: 'password123' });
    token = res.body.token;
  });

  test('updates the status', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${token}`)
      .send({ company: 'Umbrella', role: 'DevOps' });

    const id = created.body.application.id;

    const res = await request(app)
      .patch(`/v1/applications/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'interview' });

    expect(res.statusCode).toBe(200);
    expect(res.body.application.status).toBe('interview');
    expect(res.body.application.company).toBe('Umbrella');
  });
});