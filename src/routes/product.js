const express = require('express');
const axios = require('axios');
const router = express.Router();
const createError = require('http-errors');

/* GET users listing. */
router.get('/:sku', async(req, res, next) => {
  try {
    const { sku } = req.params;
    const riplayUrl = process.env.RIPLEY_API_URL;
    const { data } = await axios.get(`${riplayUrl}/products/${sku}`);
    res.json({ data });
  } catch (e) {
    console.log(e);
    next(createError(500));
  }
});
module.exports = router;
