const express = require('express');
const chartsService = require('./charts-service');

const chartsRouter = express.Router();
const jsonBodyParser = express.json();


chartsRouter
  .route('/')
  .get((req, res, next) => {
    chartsService.getAllCharts(req.app.get('db'))
      .then(charts => {
        res.json(charts);
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    chartsService.createChart(req.app.get('db'), req.body)
      .then(newChart => {
        res.json(newChart);
      })
  });

chartsRouter
  .route('/:id')
  .all(checkChartExists)
  .get((req, res, next) => {
    chartsService.getById(req.app.get('db'), req.params.id)
      .then(chart => {
        res.json(chart);
      })
      .catch();
  })
  .delete((req, res, next) => {
    chartsService.deleteById(req.app.get('db'), req.params.id)
      .then(n => {
        res.send(204);
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    chartsService.editById(req.app.get('db'), req.params.id, req.body)
      .then(editedChart => {
        res.json(editedChart);
      })
      .catch(next);
  });

chartsRouter
  .route('/:chart_id/ranges')
  .get((req, res, next) => {
    chartsService.getChartRanges(req.app.get('db'), req.params.chart_id)
      .then(ranges => {
        res.json(ranges);
      })
      .catch(next);
  });

async function checkChartExists(req, res, next) {
  try {
    const chart = await chartsService.getById(
      req.app.get('db'),
      req.params.id
    )

    if (!chart)
      return res.status(404).json({
        error: `Chart doesn't exist`
      })

    res.chart = chart;
    next();
  } catch (error) {
    next(error);
  }
}


module.exports = chartsRouter;