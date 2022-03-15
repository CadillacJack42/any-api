const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
