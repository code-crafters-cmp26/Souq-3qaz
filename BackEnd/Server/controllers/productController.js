const { request, param } = require('../app');
const db = require('../db');
const Product = require('../models/productModel');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = async (req, res) => {

  const result = await db.query(`
  SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
  FROM product AS p
  JOIN "User" AS s ON p.sellerid = s.id
  LEFT JOIN review AS r ON r.productid = p.id
  GROUP BY p.id, s.id;
  `);

  try {
    res.status(200).json({
      status: 'success',
      count: result['rowCount'],
      products: result['rows']
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
  const result = await db.query(`
    SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
    FROM product AS p
    JOIN "User" AS s ON p.sellerid = s.id
    LEFT JOIN review AS r ON r.productid = p.id
    WHERE p.id = ${id}
    GROUP BY p.id, s.id; 
  `);

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

exports.getProductBySellerId = catchAsync(async (req, res, next) => {
  const sellerId = req.params.id;
  if (!Product.idCheck(sellerId)) {
    return next(new AppError('Id must only contain numerical digits', 400));
  }
  const result = await db.query(`
    SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
    FROM product AS p
    JOIN "User" AS s ON p.sellerid = s.id
    LEFT JOIN review AS r ON r.productid = p.id
    WHERE p.sellerid = ${sellerId}
    GROUP BY p.id, s.id; 
  `);

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


exports.getProductByName = catchAsync(async (req, res, next) => {
  const name = req.body['productName'];
  const result = await db.query(`
    SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
    FROM product AS p
    JOIN "User" AS s ON p.sellerid = s.id
    LEFT JOIN review AS r ON r.productid = p.id
    WHERE name LIKE '${name}%'
    GROUP BY p.id, s.id; 
  `);

  if (result['rowCount'] === 0) {
    res.status(404).json({
      status: 'fail',
      message: 'no product found by this name'
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
    Name, Image, PreRelease, Price, Description, Quantity, Category } = req.body;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');

  const sellerId = req.user['rows'][0]['id'];


  const result = await db.query(`SELECT * FROM product WHERE name = '${Name}' AND sellerId = ${sellerId};`);

  const minn = await db.query(`SELECT w.id , w.maxquantity , COALESCE(SUM(p.quantity), 0) AS current_capacity FROM warehouse w
                                  LEFT JOIN product p ON w.id = p.storedin
                                  GROUP BY w.id
                                  ORDER BY current_capacity ASC
                                  LIMIT 1;`);

  const StoredIn = minn['rows'][0]['id'];

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
      message: adding['rows']
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
  });

});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.user;
  if (userId != -1) {
    const prod = await db.query(`SELECT * FROM product WHERE id = ${productId}`);
    if (!prod['rowCount']) {
      return next(new AppError('No Product With This Id Found', 404));
    }
    if (prod['rows'][0]['sellerid'] != userId) {
      return next(new AppError('only product owner can delete it', 403));
    }
  }
  const result = await db.query(`UPDATE product SET quantity = -1 WHERE id = ${productId}`);

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