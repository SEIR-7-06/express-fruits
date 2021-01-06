// IMPORT ORDER
/*
  - Core Modules
  - 3rd Party Packages (Modules)
  - Cutom Modules
  - Configuration Variables
*/

const express = require("express");
const ejs = require("ejs");
const fruits = require("./models/fruits.js");

const app = express(); // this will return a

const PORT = 4000;

app.set("view engine", "ejs");

// ------------------- Middleware

//-------------------- Routes

// All Fruits - INDEX
app.get("/fruits", function (req, res) {
  // Callback function - always takes req/res args
  console.log("Fruits Index Route");

  res.send(fruits);
});

// One Fruit - SHOW
app.get("/fruits/:index", function (req, res) {
  const arrayIndex = req.params.index;
  const result = fruits[arrayIndex];
  res.render("showFruit", {
    fruit: result,
  });
  // res.send(result);
});

// CREATE A ROUTE THAT RESPONDS TO REQUEST MADE TO '/localhost:4000/ejs'
// Start with console log to confirm
// Render a new EJS template at that route
app.get("/ejs", function (req, res) {
  // res.send("EJS ROUTE");
  res.render("ejsPlayground");
});

// CREATE A ROUTE THAT RESPONDS TO REQUEST MADE TO A PATH OF YOUR CHOICE
// Start with console log to confirm
// Render a new EJS template at that route
app.get("/boba-fett", function (req, res) {
  const bobafettObj = {
    name: "Boba Fett",
    vehicle: "Slave1",
    armor: "Not Beskar",
  };
  const darthVaderObj = {
    name: "Darth Vader",
    vehicle: "Tie Fighter",
    armor: "Custom Armor",
  };

  const context = {
    bobafett: bobafettObj,
    darthVader: darthVaderObj,
  };

  res.render("bobafett", context);
});

// Listen For Requests From Client
app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
