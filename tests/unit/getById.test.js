const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/applications/:id', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ username: 'alice', password: 'password123' });
    token = res.body.token;
  });

  test('returns the application if it exists', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${token}`)
      .send({ company: 'Initech', role: 'QA' });

    const id = created.body.application.id;

    const res = await request(app)
      .get(`/v1/applications/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.application.company).toBe('Initech');
  });

  test('returns 404 for a non-existent id', async () => {
    const res = await request(app)
      .get('/v1/applications/does-not-exist')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});