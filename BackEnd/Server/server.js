const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const db = require('./db')
const port = process.env.PORT || 800
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
});