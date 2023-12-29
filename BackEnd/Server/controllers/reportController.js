const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');


exports.addReport = catchAsync(async (req, res, next) => {

  const userId = req.user;

  const { sellerid, category, description } = req.body;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  await db.query(`INSERT INTO report VALUES (default,${sellerid},${userId['rows'][0]['id']},'${category}','${formattedDate}','${description}');`)


  res.status(200).json({
    status: 'success',
  });

});
