const express = require('express');
const router = express.Router();
const fruits = require("../models/fruits.js");
const Fruit = require('../models/Fruit');

// All Fruits - INDEX
router.get("/", function (req, res) {
  // Callback function - always takes req/res args

  Fruit.find({}, function (err, allFruit) {
    if (err) {
      console.log(err);
    }

    const context = {
      fruitsArray: allFruit,
    };
    res.render("indexFruit", context);
  })

});


router.get('/new', function (req, res) {
  console.log('New Route');

  res.render('newFruit');
});

// One Fruit - SHOW
router.get("/:id", function (req, res) {
  const fruitId = req.params.id;

  Fruit.findById(fruitId, function (err, foundFruit) {
    res.render("showFruit", {
      fruit: foundFruit,
    });
  });

  // res.send(result);
});

router.get('/:id/edit', function (req, res) {
  const fruitId = req.params.id;

  Fruit.findById(fruitId, function (err, foundFruit) {
    res.render('editFruit', {
      fruit: foundFruit,
    });
  });
});

router.post('/', function (req, res) {
  console.log('Create Route');
  console.log(req.body);

  const newFruitObj = {};
  newFruitObj.name = req.body.name;
  newFruitObj.color = req.body.color;

  if (req.body.readyToEat) {
    newFruitObj.readyToEat = true;
  } else {
    newFruitObj.readyToEat = false;
  }

  Fruit.create(newFruitObj, function (err, addedFruit) {
    if (err) {
      console.log(err);
    }

    res.redirect('/fruits');
  })
});

// /fruits/:id
router.delete('/:id', function (req, res) {
  
  const fruitId = req.params.id;
  console.log('hit delete route', fruitId);
  
  Fruit.findByIdAndDelete(fruitId, function (err, deletedFruit) {
    console.log('deletedFruit:', deletedFruit);
    
    res.redirect('/fruits');
  });
});

router.put('/:id', function (req, res) {
  // console.log(req.body);
  const fruitId = req.params.id;
  
  const updatedFruitObj = {
    name: req.body.name,
    color: req.body.color,
    readyToEat: req.body.readyToEat === 'on'
  }

  Fruit.findByIdAndUpdate(
    fruitId,
    updatedFruitObj,
    {new: true},
    function (err, updatedFruit) {
      res.redirect(`/fruits/${fruitId}`);
    })
});

module.exports = router;