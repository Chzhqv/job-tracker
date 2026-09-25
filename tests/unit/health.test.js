const request = require('supertest');
const app = require('../../src/app');

describe('GET /', () => {

  test('returns HTTP 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });

  test('returns status: ok in the response body', async () => {
    const res = await request(app).get('/');
    expect(res.body.status).toBe('ok');
  });

});


