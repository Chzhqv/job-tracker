const request = require('supertest');
const app = require('../../src/app');

describe('POST /v1/applications', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ username: 'alice', password: 'password123' });
    token = res.body.token;
  });

  test('creates an application', async () => {
    const res = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${token}`)
      .send({ company: 'Globex', role: 'SRE' });

    expect(res.statusCode).toBe(201);
    expect(res.body.application.company).toBe('Globex');
    expect(res.body.application.role).toBe('SRE');
    expect(res.body.application.id).toBeDefined();
  });
});