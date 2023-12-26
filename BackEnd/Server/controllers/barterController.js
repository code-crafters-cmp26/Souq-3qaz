const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getBarter = catchAsync(async (req, res, next) => {
  const requestingSellerID = req.user['rows'][0]['id'];

  const bendingBarters = await db.query(`SELECT * FROM barter WHERE requestingsellerid = ${requestingSellerID};`)
  const offers = await db.query(`SELECT * FROM barter WHERE requestedsellerid = ${requestingSellerID};`)

  res.status(200).json({
    status: "success",
    yourBendingBarters: bendingBarters['rows'],
    offersToYou: offers['rows']
  });
});

exports.barterProduct = catchAsync(async (req, res, next) => {
  const requestingSellerID = req.user['rows'][0]['id'];

  const { requestedSellerlD, offeredProductlD, requestedProductlD, offeredProductQuantity, requestedProductQuantity } = req.body;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  if (!requestedSellerlD || !offeredProductlD || !requestedProductlD || !offeredProductQuantity || !requestedProductQuantity) {
    return next(new AppError('some required Fields are empty', 400));
  }

  if (typeof requestedSellerlD !== 'number' || typeof offeredProductlD !== 'number' ||
    typeof requestedProductlD !== 'number' || typeof offeredProductQuantity !== 'number' ||
    typeof requestedProductQuantity !== 'number') {
    return next(new AppError('bad request', 400));
  }

  const offeredProduct = await db.query(`SELECT * FROM product WHERE id = ${offeredProductlD};`)
  const requestedProduct = await db.query(`SELECT * FROM product WHERE id = ${requestedProductlD};`)

  if (offeredProduct['rows'][0]['sellerid'] != requestingSellerID ||
    requestedProduct['rows'][0]['sellerid'] != requestedSellerlD) {
    return next(new AppError('bad request', 400));
  }

  if (offeredProduct['rows'][0]['quantity'] < offeredProductQuantity ||
    requestedProduct['rows'][0]['quantity'] < requestedProductQuantity) {
    return next(new AppError('Product Quantity Is Not Enough', 404));
  }

  const result = await db.query(`INSERT INTO barter VALUES(default,${requestingSellerID},${requestedSellerlD},
    ${offeredProductlD},${requestedProductlD},'${formattedDate}',${offeredProductQuantity},${requestedProductQuantity});`)

  res.status(200).json({
    status: "success"
  });
});