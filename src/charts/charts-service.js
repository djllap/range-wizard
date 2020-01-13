const xss = require('xss');
const Treeize = require('treeize');

const ChartsService = {
  getAllCharts(db) {
    return db
      .from('charts')
      .select('charts.id', 'charts.chart_name');
  },

  createChart(db, chart) {
    return db('charts')
      .insert(chart)
      .returning('*')
      .then(([chart]) => chart)
      .then(chart => 
        ChartsService.getById(db, chart.id)
      );
  },

  getChartWithName(db, name) {
    return db('charts')
      .select('id')
      .where('chart_name', name);
  },

  getById(db, id) {
    return ChartsService.getAllCharts(db)
      .where('charts.id', id)
      .first();
  },

  deleteById(db, id) {
    return db('charts')
      .where('id', id)
      .delete();
  },

  editById(db, id, chart) {
    return db('charts')
      .where('id', id)
      .update(chart)
      .returning('*')
      .then(([chart]) => chart)
      .then(chart => 
        ChartsService.getById(db, chart.id)
      );
  },

  getChartRanges(db, chart_id) {
    return db('ranges')
      .select(
        'ranges.id',
        'ranges.chart_id',
        'ranges.range_name',
        'ranges.color',
        'ranges.coords'
      )
      .where('chart_id', chart_id);
  }

};

module.exports = ChartsService; 