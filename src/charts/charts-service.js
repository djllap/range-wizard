const xss = require('xss');
const Treeize = require('treeize');

const ChartsService = {
  getAllCharts(db) {
    return db
      .from('charts')
      .select('charts.id', 'charts.chart_name');
  },

  createChart(db, data) {
    return db('charts')
      .insert(data)
      .returning('*')
      .then(([chart]) => chart)
      .then(chart => 
        ChartsService.getById(db, chart.id)
      );
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

  editById(db, id, newData) {
    return db('charts')
      .where('id', id)
      .update(newData)
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
        'ranges.range_name',
        'ranges.color',
        'ranges.coords'
      )
      .where('chart_id', chart_id);
  }

};

module.exports = ChartsService; 