const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "souqoqaz",
  password: "0160613692",
  port: 5432,
});

module.exports = { query: (text, params) => pool.query(text, params) };
