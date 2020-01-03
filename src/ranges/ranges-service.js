const xss = require('xss');
const Treeize = require('treeize');

const RangesService = {
  getAllRanges(db) {
    return db('ranges')
      .select('*');
  },

  createRanges(db, data) {
    return db('ranges')
      .insert(data)
      .returning('*');
  },

  editById(db, id, newData) {
    return db('ranges')
      .where('id', id)
      .update(newData);
  },

  deleteById(db, id) {
    return DataView('ranges')
      .where('id', id)
      .delete();
  }
};

module.exports = RangesService;