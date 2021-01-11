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

router.get('/:index/edit', function (req, res) {
  const arrayIndex = req.params.index;
  const result = fruits[arrayIndex];
  console.log(result);

  res.render('editFruit', {
    fruit: result,
    index: arrayIndex,
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

router.put('/:index', function (req, res) {
  // console.log(req.body);
  const fruitIndex = req.params.index;

  const updatedFruitObj = {
    name: req.body.name,
    color: req.body.color,
    readyToEat: req.body.readyToEat === 'on'
  }
  fruits.splice(fruitIndex, 1, updatedFruitObj);

  res.redirect(`/fruits/${fruitIndex}`);
});

module.exports = router;