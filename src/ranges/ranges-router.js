const express = require('express');
const rangesService = require('./ranges-service');

const rangesRouter = express.Router();
const jsonBodyParser = express.json();

rangesRouter
  .route('/')
  .get((req, res, next) => {
    rangesService.getAllRanges(req.app.get('db'))
      .then(ranges => {
        res.json(ranges);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    rangesService.createRanges(req.app.get('db'), req.body)
      .then(newRanges => {
        res.json(newRanges);
      })
      .catch(next);
  });

rangesRouter
  .route('/:id')
  .all(checkRangeExists)
  .patch(jsonBodyParser, (req, res, next) => {
    rangesService.editById(req.app.get('db'), req.params.id, req.body)
      .then(range => {
        res.json(range);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    rangesService.deleteById(req.app.get('db'), req.params.id)
      .then(() => {
        res.send(204);
      })
      .catch(next);
  });

async function checkRangeExists(req, res, next) {
  try {
    const range = await rangesService.getById(
      req.app.get('db'),
      req.params.id
    )

    if (!range)
      return res.status(404).json({
        error: `Range doesn't exist`
      })

    res.range = range;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = rangesRouter;