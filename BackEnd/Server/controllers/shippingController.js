const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.addshipping = catchAsync(async (req, res, next) => {

  const { email, name, priceperkm, buildingnumber, country, city, street } = req.body;
  if (!email || !name || !priceperkm || !buildingnumber || !country || !city || !street) {
    return next(new AppError('some required Fields are empty', 400));
  }

  if (typeof priceperkm != 'number' || typeof buildingnumber != 'number') {
    return next(new AppError('bad request', 400));
  }

  await db.query(`INSERT INTO shippingcompany VALUES (default,'${email}','${name}',${priceperkm},${buildingnumber},'${country}','${city}','${street}');`)

  res.status(200).json({
    status: 'success',
  });

});

exports.getshipping = catchAsync(async (req, res, next) => {

  const result = await db.query(`SELECT * FROM shippingcompany;`)

  res.status(200).json({
    status: 'success',
    result: result['rows']
  });

});
