const express = require('express');
const router = express.Router();
import axios from 'axios';

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.redirect('https://simple.ripley.cl');
  res.send('its working');
});

module.exports = router;
