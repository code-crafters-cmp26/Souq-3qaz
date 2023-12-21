const { request, param } = require('../app');
const db = require('../db');
const Product = require('../models/productModel');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = async (req, res) => {
  const x = await db.query('SELECT * FROM  product');
  try {
    res.status(200).json({
      status: 'success',
      count: x['rowCount'],
      products: x['rows']
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Error🎇"
    });
  }
};

exports.getProductById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!Product.idCheck(id)) {
    return next(new AppError('Id must only contain numerical digits', 400));
  }
  const result = await db.query(`SELECT * FROM  product WHERE id = ${id};`);
  if (result['rowCount'] === 0) {
    res.status(404).json({
      status: 'fail',
      message: 'no product found by this id'
    });
  }
  res.status(200).json({
    status: 'success',
    count: result['count'],
    products: result['rows']
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const {
    Name, Image, PreRelease, Price, Description, StoredIn, Quantity, Category } = req.body;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

  const sellerId = req.user['rows'][0]['id'];


  const result = await db.query(`SELECT * FROM product WHERE name = '${Name}' AND sellerId = ${sellerId};`);

  if (result['rowCount'] === 0) {
    const adding = await db.query(`INSERT INTO product VALUES(default,'${Image}','${Name}',${PreRelease},
      ${Price},'${Description}',${Quantity},${sellerId},'${formattedDate}','${Category}','${StoredIn}') RETURNING *;`);

    if (adding['rowCount'] === 0) {
      res.status(500).json({
        status: 'fail',
        message: 'try again later'
      });
    }
    res.status(500).json({
      status: 'success',
      message: result['rows']
    });
  }


  const increase = await db.query(`UPDATE product SET quantity = ${Quantity + result['rows'][0]['quantity']} WHERE id = ${result['rows'][0]['id']};`);

  if (increase['rowCount'] === 0) {
    res.status(500).json({
      status: 'fail',
      message: 'try again later'
    });
  }
  res.status(200).json({
    status: 'success',
    product: result['rows']
  });

});

exports.AddToWishList = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  console.log(productId);
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

  const customerId = req.user['rows'][0]['id'];



  const result = await db.query(`INSERT INTO wishList VALUES (${customerId} , ${productId} ,'${formattedDate}')`);

  if (result['rowCount'] === 0) {
    res.status(500).json({
      status: 'fail',
      message: 'try again later'
    });
  }

  res.status(200).json({
    status: 'success',
    product: result['rows']
  });

});