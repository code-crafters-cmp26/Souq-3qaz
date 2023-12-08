const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can\'t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;