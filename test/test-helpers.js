function makeChartsArray() {
  return [
    {chart_name: 'Tight 6-max'},
    {chart_name: 'sgsgsgs'},
    {chart_name: 'Basic Range'}
  ];
}

function makeRangesArray() {
  return [
    {
      chart_id: 1,
      color: '#3333ff',
      coords: ['9,6', '9,5', '8,5', '7,4', '6,3', '5,2', '4,2'],
      range_name: 'range name'
    },
    {
      chart_id: 1,
      color: '#3333ff',
      coords: ['8,6', '8,5', '7,5', '6,4', '5,3', '4,2', '3,2'],
      range_name: 'range name'
    }
  ];
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      charts,
      ranges
      RESTART IDENTITY CASCADE`
  );
}

function seedTables(db, charts, ranges) {
  db('charts').insert(charts);
  db('ranges').insert(ranges);
}

module.exports = {
  makeChartsArray,
  makeRangesArray,
  cleanTables,
  seedTables
};