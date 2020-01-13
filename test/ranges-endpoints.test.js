const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('App', () => {
  const testCharts = helpers.makeChartsArray();
  const testRanges = helpers.makeRangesArray();

  let db;
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));
  afterEach('cleanup', () => helpers.cleanTables(db));
  
  describe('GET /api/ranges', () => {
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });
    beforeEach('Seed data', () => {
      return db.into('ranges').insert(testRanges);
    });

    it('responds 200 and all the ranges' ,() => {
      return supertest(app)
        .get('/api/ranges')
        .expect(200)
        .expect(res => {
          const ranges = res.body;
          expect(ranges).to.have.lengthOf(2);
          
          ranges.forEach((range, i) => {
            expect(range.id).to.exist;
            expect(range.range_name).to.equal(testRanges[i].range_name);
          });
        });
    });
  });

  describe('POST /api/ranges', () => {
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });

    it('responds 200, inserts and returns the range', () => {
      return supertest(app)
        .post('/api/ranges')
        .send([testRanges[0]])
        .expect(200)
        .expect(res => {
          const newRange = res.body[0];
          expect(newRange.id).to.exist;
          expect(newRange.range_name).to.equal(testRanges[0].range_name);
        })
        .then(res => {
          return supertest(app)
            .get('/api/ranges/')
            .expect(res => {
              expect(res.body).to.have.lengthOf(1);
              expect(res.body[0].range_name).to.equal(testRanges[0].range_name);
            });
        });
    });
  });

  describe('DELETE /api/chart/:id', () => { 
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });
    beforeEach('Seed data', () => {
      return db.into('ranges').insert(testRanges);
    });

    it('deletes the range', () => {
      return supertest(app)
        .delete('/api/ranges/1')
        .expect(204)
        .then(() => {
          return supertest(app)
            .get('/api/ranges')
            .expect(res => {
              let included = false;
              res.body.forEach(range => {
                if (range.id === 1) included = true;
              });
              expect(included).to.equal(false);
            });
        });
    });
  });

  describe('PATCH /api/range/:id', () => { 
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });
    beforeEach('Seed data', () => {
      return db.into('ranges').insert(testRanges);
    });

    it('patches and returns the range', () => {
      return supertest(app)
        .patch('/api/ranges/1')
        .send({
          range_name: 'edited',
          coords: ['0,0'],
          chart_id: 1,
          color: 'blue',
        })
        .expect(200)
        .expect(res => {
          expect(res.body[0].range_name).to.equal('edited');
        });
    });
  });
});
