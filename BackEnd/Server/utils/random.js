const jwt = require('jsonwebtoken');
const { promisify } = require('util');


exports.getIdFromJWT = async (jwt) => {
  try {
    let token;
    if (!jwt) {
      return;
    }
    // @ts-ignore
    console.log('fdgfdg');
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log('fdgfdg', decoded);
    return decoded.id;
  } catch (error) {
    return -1;
  }
}

