const xss = require('xss');
const Treeize = require('treeize');

const ChartsService = {
  getAllCharts(db) {
    return db
      .from('charts')
      .select('charts.id', 'charts.chart_name');
  },

  createChart(db, data) {
    const chart = normalizeChartData(data);
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

  editById(db, id, newData) {
    const chart = normalizeChartData(newData);
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
        'ranges.range_name',
        'ranges.color',
        'ranges.coords'
      )
      .where('chart_id', chart_id);
  }

};

function normalizeChartData(data) {
  const { chart_name, id } = data;
  return { chart_name, id };
}

module.exports = ChartsService; 