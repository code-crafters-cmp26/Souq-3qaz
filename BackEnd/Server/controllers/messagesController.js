const { request, param } = require('../app');
const db = require('../db');
const { format } = require('date-fns');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const io = require('../app');

exports.getAllmessages = catchAsync(async (req, res, next) => {

  const userId = req.user['rows'][0]['id'];
  const user2Id = req.params.id;

  const result = await db.query(`SELECT  * FROM messagesarchive WHERE ((firstperson=${userId} AND user2Id=${user2Id}) OR(firstperson=${user2Id} AND user2Id=${userId})) ORDER BY date ASC;`);

  res.status(200).json({
    status: 'success',
    result: result['rows']
  });
});

exports.sendmessage = catchAsync(async (req, res, next) => {
  let sender = req.user['rows'][0]['id'];
  let receiver = req.params.id;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const { texxt } = req.body;

  if (!texxt) {
    return next(new AppError('some required Fields are empty', 400));
  }

  let result = await db.query(`SELECT * FROM "User" Where id = ${receiver};`)
  if (result['rowCount'] == 0) {
    return next(new AppError('No User With This Id Found', 404));
  }

  let flag = false;

  result = await db.query(`SELECT * FROM customer WHERE id = ${sender};`)
  if (result['rowCount'] == 0) {
    await db.query(`INSERT INTO messagesarchive VALUES(default,${receiver},${sender},'${formattedDate}','${texxt}',true);`)
  }
  else {
    await db.query(`INSERT INTO messagesarchive VALUES(default,${sender},${receiver},'${formattedDate}','${texxt}',false);`)
    io.to(result['rows'][0]['socketcode']).emit('eslam', 'Hello, client! This is a response.');
  }



  res.status(200).json({
    status: 'success'
  });
});
