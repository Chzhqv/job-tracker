const request = require('supertest');
const app = require('../../src/app');

describe('DELETE /v1/applications/:id', () => {
  test('deletes an application', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .send({ company: 'Google', role: 'DevOps' });

    const id = created.body.application.id;

    const res = await request(app).delete(`/v1/applications/${id}`)

    expect(res.statusCode).toBe(200);
  });
  
  test('returns 404 for a deleted application', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .send({ company: 'Wayne Enterprises', role: 'Security' });

    const id = created.body.application.id;

    await request(app).delete(`/v1/applications/${id}`);

    const getRes = await request(app).get(`/v1/applications/${id}`);
    expect(getRes.statusCode).toBe(404);
  });

});
