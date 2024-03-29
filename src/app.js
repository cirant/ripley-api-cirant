import express from 'express';
import logger from 'morgan';
import createError from 'http-errors';
import * as admin from 'firebase-admin';
import cors from 'cors';
import axios from 'axios';

import indexRouter from './routes/';
import productRouter from './routes/product';

axios.get(process.env.FIREBASE_CREDENTIALS)
  .then(ress => {
    admin.initializeApp({
      credential: admin.credential.cert(ress.data),
      databaseURL: 'https://riplay-b89be.firebaseio.com',
    });
  });

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authenticated = async(req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1];
    await admin.auth().verifyIdToken(token);
    next();
  } catch (e){
    console.error('error !!!!!! ', e);
    next(createError(401));
  }
};

const urlPrefix = process.env.API_PREFIX || '/';

app.use('/', indexRouter);
app.use(`${urlPrefix}product`, authenticated, productRouter);

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
