
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

  createRanges(db, ranges) {
    return db('ranges')
      .insert(ranges)
      .returning('*');
  },

  editById(db, id, range) {
    return db('ranges')
      .where('id', id)
      .update(range)
      .returning('*');
  },

  deleteById(db, id) {
    return db('ranges')
      .where('id', id)
      .delete();
  }
};

module.exports = RangesService;