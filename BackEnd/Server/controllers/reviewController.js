const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.reviewProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const { rating, comment } = req.body;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const customerId = req.user['rows'][0]['id'];
  const result = await db.query(`INSERT INTO review VALUES(default,${customerId},${productId},'${formattedDate}',${rating},'${comment}');`);

  if (result['rowCount'] === 0) {
    res.status(500).json({
      status: 'fail',
      message: 'try again later'
    });
  }

  res.status(200).json({
    status: 'success',
  });

});

exports.deleteReview = catchAsync(async (req, res, next) => {

  const reviewId = req.params.id;
  const customerId = req.user['rows'][0]['id'];

  const reviewOwner = await db.query(`SELECT customerid FROM review WHERE reviewid = ${reviewId};`);

  if (reviewOwner['rowCount'] == 0) {
    return next(new AppError('No Review With This Id Found', 404));
  }
  if (reviewOwner['rows'][0]['customerid'] != customerId) {
    return next(new AppError('only review owner can delete it', 401));
  }

  const result = await db.query(`DELETE FROM review WHERE reviewid = ${reviewId};`);

  if (result['rowCount'] === 0) {
    res.status(500).json({
      status: 'fail',
      message: 'try again later'
    });
  }

  res.status(200).json({
    status: 'success',
  });

});

exports.getReviews = catchAsync(async (req, res, next) => {

  const productId = req.params.id;

  if (!(/^\d+$/.test(productId)) || productId < 0) {
    return next(new AppError('No Product With This Id Found', 400));
  }

  const result = await db.query(`SELECT * FROM review Where productid = ${productId}`);

  for (let i = 0; i < result['rows'].length; i++) {
    const customerName = await db.query(`SELECT firstname, lastname FROM "User" Where id = ${result['rows'][i]['customerid']};`)
    result['rows'][i]['customerFName'] = customerName['rows'][0]['firstname'];
    result['rows'][i]['customerLName'] = customerName['rows'][0]['lastname'];
  }

  res.status(200).json({
    status: 'success',
    reviews: result['rows']
  });

});