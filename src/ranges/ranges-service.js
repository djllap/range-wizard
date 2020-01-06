const xss = require('xss');
const Treeize = require('treeize');

const RangesService = {
  getAllRanges(db) {
    return db('ranges')
      .select('*');
  },

  getById(db, id) {
    return db('ranges')
      .select('*')
      .where('id', id);
  },

  createRanges(db, data) {
    return db('ranges')
      .insert(data)
      .returning('*');
  },

  editById(db, id, newData) {
    return db('ranges')
      .where('id', id)
      .update(newData)
      .returning('*');
  },

  deleteById(db, id) {
    return DataView('ranges')
      .where('id', id)
      .delete();
  }
};

function normalizeRangeData(data) {
  
}

module.exports = RangesService;