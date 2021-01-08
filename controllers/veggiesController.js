const express = require('express');
const router = express.Router();

// All routes here get /veggies in front

// veggies index
router.get('/', function (req, res) {
  res.send('GET to /veggies was hit');
});

// veggies show
router.get('/:index', function (req, res) {
  res.send('GET to /veggies/:index');
});

module.exports = router;