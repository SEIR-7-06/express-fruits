const express = require('express');
const router = express.Router();
const fruits = require("../models/fruits.js");

// All Fruits - INDEX
router.get("/", function (req, res) {
  // Callback function - always takes req/res args
  console.log("Fruits Index Route");
  console.log(fruits);
  const context = {
    fruitsArray: fruits,
  };
  res.render("indexFruit", context);
});


router.get('/new', function (req, res) {
  console.log('New Route');

  res.render('newFruit');
});

// One Fruit - SHOW
router.get("/:index", function (req, res) {
  const arrayIndex = req.params.index;
  const result = fruits[arrayIndex];
  res.render("showFruit", {
    fruit: result,
    index: arrayIndex,
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

  fruits.push(newFruitObj);

  res.redirect('/fruits');
});

router.delete('/:index', function (req, res) {
  console.log(fruits);
  
  fruits.splice(req.params.index, 1);

  console.log(fruits);

  res.redirect('/fruits');
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