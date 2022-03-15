const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Band = require('../lib/models/Band');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Should upload a band to the db', async () => {
    const res = await request(app)
      .post('/api/v1/bands')
      .send({ name: 'Nine Inch Nails', members: 2, inception: '1988' });

    expect(res.body).toEqual({
      name: 'Nine Inch Nails',
      members: 2,
      inception: '1988',
    });
  });

  it('Should fetch and return a band by id', async () => {
    const band = await Band.insert({
      name: 'TOOL',
      members: 5,
      inception: '1990',
    });
    const res = await request(app).get(`/api/v1/bands/${band.id}`);
    expect(res.body).toEqual(band);
  });
});
