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

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
}

const sendErrorProd = (err, res) => {
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
    if (error.message == 'duplicate key value violates unique constraint \"unique_email\"') error = handleDublicateEmail(error);
    if (error.message == 'Phone number must only contain numerical digits"') error = handlePhoneInvalid(error);
    if (error.message == 'Email is invalid"') error = handleEmailInvalid(error);
    if (error.message == 'role is invalid"') error = handleRoleInvalid(error);
    if (error.message == 'NId is required for sellers"') error = handleNid(error);
    if (error.message == 'NId must only contain numerical digits"') error = handleNidInvalid(error);
    if (error.message == 'please provide email & password"') error = handleNoEmailOrPass(error);
    if (error.message == 'incorrect email or password"') error = handleWrongEmailOrPass(error);
    sendErrorProd(error, res);
  }
}