const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.addwarehouse = catchAsync(async (req, res, next) => {

  const { maxQuantity, buildingnumber, country, city, street } = req.body;
  if (!maxQuantity || !buildingnumber || !country || !city || !street) {
    return next(new AppError('some required Fields are empty', 400));
  }

  if (typeof maxQuantity != 'number' || typeof buildingnumber != 'number') {
    return next(new AppError('bad request', 400));
  }

  await db.query(`INSERT INTO warehouse VALUES (default,${maxQuantity},${buildingnumber},'${country}','${city}','${street}');`)

  res.status(200).json({
    status: 'success',
  });

});

exports.getwares = catchAsync(async (req, res, next) => {

  const result = await db.query(`SELECT * FROM warehouse;`)

  res.status(200).json({
    status: 'success',
    result: result['rows']
  });

});
