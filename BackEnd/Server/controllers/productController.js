const { request, param } = require('../app');
const db = require('../db');
const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = async (req, res) => {
  const x = await db.query('SELECT * FROM  product');
  try {
    res.status(200).json({
      status: 'success',
      count: x['count'],
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
    return next(new AppError('no Product found', 404));
  }
  res.status(200).json({
    status: 'success',
    count: result['count'],
    products: result['rows']
  });
});