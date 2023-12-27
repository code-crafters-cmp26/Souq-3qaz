const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllAuction = catchAsync(async (req, res, next) => {

  const result = await db.query(`SELECT  a.*,p.name AS productName, u.firstname, u.lastname FROM auction AS a, product AS p, "User" AS u`);

  res.status(200).json({
    status: 'success',
    result: result['rows']
  });
});

exports.addAuction = catchAsync(async (req, res, next) => {
  const sellerId = req.user['rows'][0]['id'];
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const { productId, quantity, intialPrice } = req.body;

  const productInfo = await db.query(`SELECT * FROM product WHERE id = ${productId}`)

  if (productInfo['rows'][0]['sellerid'] != sellerId) {
    return next(new AppError('You Must Have The Product To Use It', 402));
  }

  if (productInfo['rows'][0]['quantity'] < quantity) {
    return next(new AppError('Product Quantity Is Not Enough', 404));
  }

  const result = await db.query(`INSERT INTO auction VALUES(default,${sellerId},${productId},'${formattedDate}',${intialPrice},${quantity});`)
  await db.query(`UPDATE product SET quantity = quantity-${quantity} WHERE id = ${productId};`)

  console.log(productInfo['rows'][0]);

  res.status(200).json({
    status: 'success'
  });
});