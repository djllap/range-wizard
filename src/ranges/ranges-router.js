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
    const ranges = normalizeRangeData(req.body);
    ranges.forEach(range => {
      validateRangeData(range, res);
    })
    rangesService.createRanges(req.app.get('db'), req.body)
      .then(newRanges => {
        res.json(newRanges);
      })
      .catch(next);
  })

rangesRouter
  .route('/:id')
  .all(checkRangeExists)
  .patch(jsonBodyParser, (req, res, next) => {
    const range = normalizeRangeData(req.body);
    validateRangeData(range, res);
    rangesService.editById(req.app.get('db'), req.params.id, range)
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

function validateRangeData(range, res) {
  const { chart_id, range_name, color, coords } = range;
  const requiredFields = {"chart Id":chart_id, "Range Name":range_name, "Color":color, "Coordinates":coords};

  for (const [key, value] of Object.entries(requiredFields)) {
    if (!value) {
      res.statusMessage = `${key} must be present`;
      res.status(400).end()
    }
  }

  if (typeof chart_id !== 'number') {
    res.statusMessage = 'Chart Id must be a number';
    res.status(400).send('')
  };
  if (typeof range_name !== "string") {
    res.statusMessage = 'Range Name must be a string';
    res.status(400).send('');
  };
  if (typeof color !== "string") {
    res.statusMessage = 'Color must be a string';
    res.status(400).send('');
  } 
  if (typeof coords !== "object" || typeof coords.length !== 'number') {
    res.statusMessage = 'Coords must be an Array';
    res.status(400).send('');
  };
}

function normalizeRangeData(data) {
  if (data.length) { //if data is an array
    const ranges = data.map(range => {
      const { chart_id, color, coords, range_name } = range;
      return { chart_id, color, coords, range_name };
    });
    return ranges;
  } else { //if data is a single object
    const { chart_id, color, coords, range_name } = data;
    return { chart_id, color, coords, range_name };
  }


}

module.exports = rangesRouter;