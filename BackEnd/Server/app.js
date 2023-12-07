const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRouter');

const app = express();

if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/product', productRouter);

module.exports = app;