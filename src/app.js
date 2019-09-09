import express from 'express';
import logger from 'morgan';
import createError from 'http-errors';

import indexRouter from './routes/';

const productRouter = require('./routes/product');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500).json(err);
  next();
});

module.exports = app;
