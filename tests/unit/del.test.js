const request = require('supertest');
const app = require('../../src/app');

describe('DELETE /v1/applications/:id', () => {
  let token;

  beforeAll(async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ username: 'alice', password: 'password123' });
    token = res.body.token;
  });

  test('deletes an application', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${token}`)
      .send({ company: 'Google', role: 'DevOps' });

    const id = created.body.application.id;

    const deleteRes = await request(app)
      .delete(`/v1/applications/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteRes.statusCode).toBe(200);
  });

  test('returns 404 for a deleted application', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${token}`)
      .send({ company: 'Wayne Enterprises', role: 'Security' });

    const id = created.body.application.id;

    await request(app)
      .delete(`/v1/applications/${id}`)
      .set('Authorization', `Bearer ${token}`);

    const getRes = await request(app)
      .get(`/v1/applications/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getRes.statusCode).toBe(404);
  });
});