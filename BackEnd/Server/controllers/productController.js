const { request, param } = require('../app');

exports.testApi = async (req, res) => {
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
};