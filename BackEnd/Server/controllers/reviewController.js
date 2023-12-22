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