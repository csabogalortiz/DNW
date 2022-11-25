const express = require('express');
const { isLoggedOut } = require('../middleware/route-guard');
const router = express.Router();

router.get("/", isLoggedOut, (req, res, next) => {
  res.render("index");
});

// router.get("/home", (req, res, next) => {
//   res.render("home");

// });

module.exports = router;
