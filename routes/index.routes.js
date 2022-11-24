const express = require('express');
const { isLoggedOut } = require('../middleware/route-guard');
const router = express.Router();

/* GET Log in page */
router.get("/", isLoggedOut, (req, res, next) => {
  res.render("index");
});

// /* GET home page */
router.get("/home", (req, res, next) => {
  res.render("home");
  // res.send("Home goes here")
});

module.exports = router;
