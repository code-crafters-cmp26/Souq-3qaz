const AppError = require('../utils/appError');

const handleFieldsAreEmpty = err => {
  const message = err.message;
  return new AppError(message, 400);
};

const handleDublicateEmail = err => {
  const message = "this eamil is already exists";
  return new AppError(message, 409);
};

const handleRoleInvalid = err => {
  const message = "the role is invalid";
  return new AppError(message, 400);
};

const handlePhoneInvalid = err => {
  const message = "Phone number must only contain numerical digits";
  return new AppError(message, 400);
};

const handleEmailInvalid = err => {
  const message = "Email is invalid";
  return new AppError(message, 400);
};

const handleNid = err => {
  const message = "NId is required for sellers";
  return new AppError(message, 400);
};

const handleNidInvalid = err => {
  const message = "NId must only contain numerical digits";
  return new AppError(message, 400);
};

const handleNoEmailOrPass = err => {
  const message = "please provide email & password";
  return new AppError(message, 400);
};

const handleWrongEmailOrPass = err => {
  const message = "incorrect email or password";
  return new AppError(message, 401);
};

const handleProductExistInWish = err => {
  const message = "You Already Have Done This Before";
  return new AppError(message, 409);
};

const handleNoProductFound = err => {
  const message = "No Product With This Id Found";
  return new AppError(message, 404);
};

const handleReviewNotInRage = err => {
  const message = "rating must be between 0 and 5";
  return new AppError(message, 404);
};

const handleNotOwnerOfReview = err => {
  const message = "only review owner can delete it";
  return new AppError(message, 401);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

const sendErrorProd = (err, res) => {
  console.log(err.message);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
  else {
    console.error('error is :::>', err);
    res.status(500).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  else if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (error.message == 'some required Fields are empty') error = handleFieldsAreEmpty(error);
    else if (error.message == 'duplicate key value violates unique constraint \"unique_email\"') error = handleDublicateEmail(error);
    else if (error.message == 'Phone number must only contain numerical digits"') error = handlePhoneInvalid(error);
    else if (error.message == 'Email is invalid"') error = handleEmailInvalid(error);
    else if (error.message == 'role is invalid"') error = handleRoleInvalid(error);
    else if (error.message == 'NId is required for sellers"') error = handleNid(error);
    else if (error.message == 'NId must only contain numerical digits"') error = handleNidInvalid(error);
    else if (error.message == 'please provide email & password"') error = handleNoEmailOrPass(error);
    else if (error.message == 'incorrect email or password"') error = handleWrongEmailOrPass(error);
    else if (error.message == 'only review owner can delete it') error = handleNotOwnerOfReview(error);
    else if (error.constraint && error.constraint == 'review_rating_check') error = handleReviewNotInRage(error);
    else if (error.detail && error.detail.match(/Key \(.+?\) already exists/)) error = handleProductExistInWish(error);
    else if (error.detail && /^Key.*is not present in table "product"\.$/.test(error.detail)) error = handleNoProductFound(error);
    sendErrorProd(error, res);
  }
}