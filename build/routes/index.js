"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.redirect('https://simple.ripley.cl');
  res.send('its working');
});
module.exports = router;