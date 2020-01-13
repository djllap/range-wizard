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
  
  describe('GET /api/charts', () => {
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });

    it('responds 200 and all the charts' ,() => {
      return supertest(app)
        .get('/api/charts')
        .expect(200)
        .expect(res => {
          const charts = res.body;
          expect(charts).to.have.lengthOf(3);
          
          charts.forEach((chart, i) => {
            expect(chart.id).to.exist;
            expect(chart.chart_name).to.equal(testCharts[i].chart_name);
          });
        });
    });
  });

  describe('POST /api/charts', () => {
    it('responds 200, inserts and returns the chart', () => {
      return supertest(app)
        .post('/api/charts')
        .send(testCharts[0])
        .expect(200)
        .expect(res => {
          const newChart = res.body;
          expect(newChart.id).to.exist;
          expect(newChart.chart_name).to.equal(testCharts[0].chart_name);
        })
        .then(res => {
          return supertest(app)
            .get(`/api/charts/${res.body.id}`)
            .expect(res.body);
        });
    });
  });

  describe('GET /api/chart/:id', () => { 
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });

    it('responds 200 and the chart', () => {
      return supertest(app)
        .get('/api/charts/1')
        .expect(200)
        .expect(res => {
          const chart = res.body;
          expect(chart.id).to.exist;
          expect(chart.chart_name).to.equal(testCharts[0].chart_name);
        });
    });
  });

  describe('DELETE /api/chart/:id', () => { 
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });

    it('deletes the chart', () => {
      return supertest(app)
        .delete('/api/charts/1')
        .expect(204)
        .then(() => {
          return supertest(app)
            .get('/api/charts')
            .expect(res => {
              let included = false;
              res.body.forEach(chart => {
                if (chart.id === 1) included = true;
              });
              expect(included).to.equal(false);
            });
        });
    });
  });

  describe('PATCH /api/chart/:id', () => { 
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });

    it('patches and returns the chart', () => {
      return supertest(app)
        .patch('/api/charts/1')
        .send({chart_name: 'edited'})
        .expect(200)
        .then(() => {
          return supertest(app)
            .get('/api/charts/1')
            .expect(res => {
              expect(res.body.chart_name).to.equal('edited');
            });
        });
    });
  });

  describe('GET /api/chart/:id/ranges', () => { 
    beforeEach('Seed data', () => {
      return db.into('charts').insert(testCharts);
    });
    beforeEach('Seed data', () => {
      return db.into('ranges').insert(testRanges);
    });

    it('patches and returns the chart', () => {
      return supertest(app)
        .get('/api/charts/1/ranges')
        .expect(200)
        .expect(res => {
          const ranges = res.body;
          expect(ranges).to.have.lengthOf(2);
          ranges.forEach((range, i) => {
            expect(range.chart_id).to.equal(1);
          });
        });
    });
  });
});
