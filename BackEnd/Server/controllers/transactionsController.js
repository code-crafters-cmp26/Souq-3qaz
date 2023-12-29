const { request, param } = require('../app');
const db = require('../db');
const Cart = require('../models/cartModel');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.buy = catchAsync(async (req, res, next) => {
  const cart = req.body['cart'];

  if (!Cart.validateCart(cart)) {
    return next(new AppError('bad request', 400));
  }

  const customerId = req.user['rows'][0]['id'];
  await db.query("SELECT nextval('transaction_shipmentid_seq');");
  const shipmentId = await db.query("SELECT currval('transaction_shipmentid_seq') AS last_value;")

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const cost = await Cart.cartCost(cart);

  if (cost == -1) {
    return next(new AppError('No Product With This Id Found', 404));
  }

  for (const item of cart) {
    const result = await db.query(`SELECT quantity FROM product WHERE id = ${item.productId}`);
    if (result['rows'][0]['quantity'] < item.Quantity) {
      return next(new AppError('Product Quantity Is Not Enough', 404));
    }
  }

  const balance = await db.query(`SELECT balance FROM "User" WHERE id = ${customerId}`);

  if (cost > balance['rows'][0]['balance']) {
    return next(new AppError('not enough money in your balance', 402));
  }

  await db.query(`UPDATE "User" SET balance = ${balance['rows'][0]['balance'] - cost} WHERE id = ${customerId};`)
  for (const item of cart) {

    await db.query(`UPDATE product SET quantity = quantity-${item.Quantity} WHERE id = ${item.productId};`);
    const result = await db.query(`INSERT INTO transaction VALUES (default,${customerId},${item.productId},'${formattedDate}',false, false,${item.shippedvia}, ${item.Quantity},${shipmentId['rows'][0]['last_value']} );`)
  };

  res.status(200).json({
    "status": "success",
    "shipmentId": shipmentId['rows'][0]['last_value']
  });

});

exports.getTranscations = catchAsync(async (req, res, next) => {
  const userId = req.user;


  const result = await db.query(`SELECT transaction.*
      FROM transaction
      JOIN product ON transaction.productid = product.id
      WHERE product.sellerid = ${userId['rows'][0]['id']};`)

  res.status(200).json({
    "status": "success",
    retult: result['rows']
  });

});