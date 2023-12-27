const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const server = require('./app');
const socketIO = require('socket.io');
const port = process.env.PORT || 800


server.listen(port, () => {
  console.log(`app running on port ${port}...`)
});