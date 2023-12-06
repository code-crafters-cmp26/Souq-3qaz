const express = require('express');
const morgan = require('morgan');

const app = express();

const router = express.Router();

if (process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: "First Api"
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: "Error🎇"
    });
  }

})

module.exports = app;