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
      id: expect.any(String),
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

    const expected = {
      id: expect.any(String),
      name: 'TOOL',
      members: 5,
      inception: '1990',
    };

    console.log('BAND LOG', band);
    const res = await request(app).get(`/api/v1/bands/${band.id}`);
    expect(res.body).toEqual(expected);
  });

  it('Should fetch all bands from db', async () => {
    const band = await Band.insert({
      name: 'The Rolling Stones',
      members: 4,
      inception: '5000 B.C.',
    });

    const expected = [
      {
        id: 1,
        name: 'Nine Inch Nails',
        members: 2,
        inception: '1988',
      },
      {
        id: 2,
        name: 'The Rolling Stones',
        members: 4,
        inception: '5000 B.C.',
      },
    ];

    const res = await request(app).get('/api/v1/bands');
    expect(res.body).toEqual(expected);
  });
});
