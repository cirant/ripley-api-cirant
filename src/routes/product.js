const express = require('express');
const router = express.Router();
const createError = require('http-errors');

import { productList } from '../constants/productList.js';
import { Service } from '../services';

/* GET users listing. */
router.get('/:sku', async(req, res, next) => {
  try {
    const { sku } = req.params;
    const service = new Service();
    const data = await service.getproductDetails(sku);
    res.json({ data });
  } catch (e) {
    console.log(e);
    next(createError(500));
  }
});

router.get('/', async(req, res, next) => {
  try {
    res.json({ data: productList });
  } catch (e) {
    console.log(e);
    next(createError(500));
  }
});
module.exports = router;
