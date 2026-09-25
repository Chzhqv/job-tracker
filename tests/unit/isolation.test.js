const request = require('supertest');
const app = require('../../src/app');

describe('per-user data isolation', () => {
  let aliceToken;
  let bobToken;

  beforeAll(async () => {
    const aliceLogin = await request(app)
      .post('/v1/auth/login')
      .send({ username: 'alice', password: 'password123' });
    aliceToken = aliceLogin.body.token;

    const bobLogin = await request(app)
      .post('/v1/auth/login')
      .send({ username: 'bob', password: 'password123' });
    bobToken = bobLogin.body.token;
  });

  test("bob's list does not include alice's application", async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({ company: 'Alice Corp' });

    const aliceAppId = created.body.application.id;

    const bobList = await request(app)
      .get('/v1/applications')
      .set('Authorization', `Bearer ${bobToken}`);

    const ids = bobList.body.applications.map((a) => a.id);
    expect(ids).not.toContain(aliceAppId);
  });

  test('bob gets 404 reading an application that belongs to alice', async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({ company: 'Alice Corp Again' });

    const aliceAppId = created.body.application.id;

    const res = await request(app)
      .get(`/v1/applications/${aliceAppId}`)
      .set('Authorization', `Bearer ${bobToken}`);

    expect(res.statusCode).toBe(404);
  });

  test("bob's delete request does not remove alice's application", async () => {
    const created = await request(app)
      .post('/v1/applications')
      .set('Authorization', `Bearer ${aliceToken}`)
      .send({ company: 'Alice Corp Still' });

    const aliceAppId = created.body.application.id;

    await request(app)
      .delete(`/v1/applications/${aliceAppId}`)
      .set('Authorization', `Bearer ${bobToken}`);

    const stillThere = await request(app)
      .get(`/v1/applications/${aliceAppId}`)
      .set('Authorization', `Bearer ${aliceToken}`);

    expect(stillThere.statusCode).toBe(200);
  });
});
