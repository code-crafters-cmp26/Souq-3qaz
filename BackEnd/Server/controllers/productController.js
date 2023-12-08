const { request, param } = require('../app');
const db = require('../db');

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