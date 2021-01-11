// IMPORT ORDER
/*
  - Core Modules
  - 3rd Party Packages (Modules)
  - Cutom Modules
  - Configuration Variables
*/

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejs = require('ejs');

require('./connection.js');

const veggiesController = require('./controllers/veggiesController.js');
const dairyController = require('./controllers/dairyController.js');
const fruitsController = require('./controllers/fruitsController.js');

const app = express(); // this will return a

const PORT = 4000;

app.set('view engine', 'ejs');

// ------------------- Middleware

app.use(function (req, res, next) {
  // console.log('Middleware was called');

  next(); // Allow the reques to continue
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//-------------------- Routes 

// CRUD Operations - Create, read, update, delete
// app.get('/veggies', function (req, res) {
//   res.send('GET to /veggies route hit');
// });
app.use('/veggies', veggiesController);
app.use('/dairy', dairyController);
app.use('/fruits', fruitsController);

// CREATE A ROUTE THAT RESPONDS TO REQUEST MADE TO '/localhost:4000/ejs'
// Start with console log to confirm
// Render a new EJS template at that route
app.get('/ejs', function (req, res) {
  // res.send('EJS ROUTE');
  res.render('ejsPlayground');
});

// CREATE A ROUTE THAT RESPONDS TO REQUEST MADE TO A PATH OF YOUR CHOICE
// Start with console log to confirm
// Render a new EJS template at that route
app.get('/boba-fett', function (req, res) {
  const bobafettObj = {
    name: 'Boba Fett',
    vehicle: 'Slave1',
    armor: 'Not Beskar',
  };
  const darthVaderObj = {
    name: 'Darth Vader',
    vehicle: 'Tie Fighter',
    armor: 'Custom Armor',
  };

  const context = {
    bobafett: bobafettObj,
    darthVader: darthVaderObj,
  };

  res.render('bobafett', context);
});

// Listen For Requests From Client
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
