import '@testing-library/jest-dom/extend-expect';

const server = require('./app.js');
const supertest = require('supertest');
let requestWithSupertest;

describe('app.js', () => {

  beforeEach(() => {
    requestWithSupertest = supertest(server);
  })


  it('GET /api/employees should show all users', async () => {
    const res = await requestWithSupertest.get('/api/employees');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual([{ "name": "Simon" }])
  });


  it('GET /api/employee/1 should return user', async () => {
    const res = await requestWithSupertest.get('/api/employee/1');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ id: "1", name: "Simon Ludwig" })
  });


  it('GET /api/employee/2 should return 404', async () => {
    const res = await requestWithSupertest.get('/api/employee/2 ');
    expect(res.status).toEqual(404);
  });

  it('POST /api/employee should add new user', async () => {
    await requestWithSupertest.post('/api/employee ');

    const res = await requestWithSupertest.get('/api/employee/2');
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toEqual({ id: "2", name: "Tobias Ludwig" })
  });

})