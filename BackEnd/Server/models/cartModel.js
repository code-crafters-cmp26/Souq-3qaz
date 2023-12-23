const catchAsync = require("../utils/catchAsync");
const db = require('../db');

exports.validateCart = (cart) => {
  if (!Array.isArray(cart)) {
    return false;
  }
  for (const item of cart) {
    if (typeof item !== 'object' || item === null) {
      return false;
    }
    if (!('productId' in item) || !('Quantity' in item) || !('shippedvia' in item)) {
      return false;
    }
    if (typeof item.productId !== 'number' || typeof item.Quantity !== 'number' || typeof item.shippedvia !== 'number') {
      return false;
    }
    if (item.Quantity <= 0) {
      return false;
    }
  }
  return true;
};


exports.cartCost = async (cart) => {
  try {
    let cost = 0;
    for (const item of cart) {
      const result = await db.query(`SELECT price FROM product WHERE id = ${item.productId}`);
      cost = cost + result['rows'][0]['price'] * item.Quantity;
    }
    return cost;
  } catch (error) {
    return -1;
  }
};