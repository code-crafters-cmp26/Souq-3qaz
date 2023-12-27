const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "souqoqaz",
  password: "28*S45%uk0i{",
  port: 5432,
});

module.exports = { query: (text, params) => pool.query(text, params) };
