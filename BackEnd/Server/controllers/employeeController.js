const { request, param } = require("../app");
const db = require("../db");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { format } = require("date-fns");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { email } = require("is");

const signToken = (id) => {
  // @ts-ignore
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, userId, role, statusCode, res) => {
  const token = signToken(userId);

  const cookieOptions = {
    // @ts-ignore
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    user: user["rows"][0],
    role: role,
  });
};

exports.addTech = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd HH:mm:ss");
  const {
    FName,
    LName,
    PhoneNumber,
    Email,
    Password,
    Gender,
    start_working_date,
  } = req.body;
  if (
    !FName ||
    !LName ||
    !PhoneNumber ||
    !Email ||
    !Password ||
    !Gender ||
    !start_working_date
  ) {
    return next(new AppError("some required Fields are empty", 409));
  }

  const hashedPassword = await User.hashPassword(Password);
  if (hashedPassword == -1)
    return next(new AppError("some thing went wrong try again", 500));

  const newEmployee =
    await db.query(`INSERT INTO employee Values(DEFAULT, '${FName}', '${LName}', '${start_working_date}', 'Tech Support',
    '${Email}', '${hashedPassword}', '${Gender}', '${PhoneNumber}', '${formattedDate}', '3165494 ', '${formattedDate}') RETURNING *;`);

  createSendToken(
    newEmployee,
    newEmployee["rows"][0]["id"],
    "Tech Support",
    201,
    res
  );
});

exports.getstats = catchAsync(async (req, res, next) => {

  const normal = await db.query(`
    SELECT
    COUNT(CASE WHEN type = 'Normal' THEN 1 END) AS normal,
    (SELECT COUNT(*) FROM customer) - COUNT(CASE WHEN type = 'Normal' THEN 1 END) AS Permium
FROM
    customer;
  `);

  const seller = await db.query(`
    SELECT COUNT(*) AS seller
    FROM seller ;
  `)

  console.log(normal['rows']);

  res.status(200).json({
    status: "success",
    normal: normal['rows'][0]['normal'],
    premium: normal['rows'][0]['permium'],
    seller: seller['rows'][0]['seller']
  })

});