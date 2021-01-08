const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send('GET to /dairy was hit 🥛');
});

module.exports = router;