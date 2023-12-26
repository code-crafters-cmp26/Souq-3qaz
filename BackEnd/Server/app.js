const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const reviewRouter = require('./routes/reviewRouter');
const transactionsRouter = require('./routes/transactionsRouter');
const auctionRouter = require('./routes/auctionRouter');
const barterRouter = require('./routes/barterRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/product', productRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/buy', transactionsRouter);
app.use('/api/v1/auction', auctionRouter);
app.use('/api/v1/barter', barterRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can\'t find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;