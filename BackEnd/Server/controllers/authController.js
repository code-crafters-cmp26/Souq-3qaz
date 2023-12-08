const db = require('../db');
const jwt = require('jsonwebtoken');
const { format } = require('date-fns');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const signToken = id => {
  // @ts-ignore
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  // console.log(Date.now().toString().slice(0, 10));

  const cookieOptions = {
    // @ts-ignore
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production')
    cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}

exports.createUser = catchAsync(async (req, res, next) => {

  const {
    FName, LName, PhoneNumber, Email, Password, Gender, ApartmentNumber,
    BuildingNumber, Country, City, Street, role, NId } = req.body;

  const image = 'default address';
  const balance = 0;
  const theme = 'Light';
  const banned = false;
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
  const passwordChangedAt = formattedDate;
  const passwordresettoken = '3165494';
  const passwordresetexpires = formattedDate;

  if (!FName || !LName || !PhoneNumber || !Email || !Password || !Gender || !ApartmentNumber || !BuildingNumber || !Country || !City || !Street) {
    return next(new AppError('some required Fields are empty', 400));
  }

  if (!User.phoneCheck(PhoneNumber)) {
    return next(new AppError('Phone number must only contain numerical digits', 400));
  }

  if (!User.checkEmail(Email)) {
    return next(new AppError('Email is invalid', 400));
  }

  if (!role || (role != 'Seller' && role != 'Customer')) {
    return next(new AppError('role is invalid', 400));
  }

  if (role === 'Seller' && !('NId' in req.body)) {
    return next(new AppError('NId is required for sellers', 400));
  }

  if ('NId' in req.body && !User.phoneCheck(NId)) {
    return next(new AppError('NId must only contain numerical digits', 400));
  }

  const hashedPassword = User.hashPassword(Password);

  const newUser = await db.query(`INSERT INTO "User" Values(DEFAULT, '${FName}', '${LName}', '${PhoneNumber}', '${image}',
    '${balance}', '${Email}', '${hashedPassword}', '${theme}', ${banned}, '${Gender}', ${ApartmentNumber}, ${BuildingNumber},
    '${Country}', '${City}', '${Street}','${passwordChangedAt}','${passwordresettoken}','${passwordresetexpires}') RETURNING *;`)

  if (role === 'Seller') {
    await db.query(`INSERT INTO Seller Values('${newUser['rows'][0]['id']}','${NId}');`);
  }
  if (role === 'Customer') {
    await db.query(`INSERT INTO Customer Values('${newUser['rows'][0]['id']}','Normal');`);
  }

  createSendToken(newUser, 201, res);
});


exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return next(new AppError('please provide email & password', 400));
  }

  if (!User.checkEmail(email)) {
    return next(new AppError('incorrect email or password', 401));
  }

  const user = await db.query(`SELECT password FROM "User" WHERE email = '${email}';`);
  const truePassword = user['rows'][0]['password'] + '';
  // @ts-ignore
  const correct = User.checkPassword(password, truePassword);
  // @ts-ignore
  if (user['rowCount'] == 0 || !correct) {
    return next(new AppError('incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
});
