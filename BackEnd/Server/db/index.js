const { Pool } = require("pg");

const pool = new Pool({
  user: "souq_3qaz_db_user",
  host: "dpg-cms05ha1hbls73dr22eg-a.oregon-postgres.render.com",
  database: "souq_3qaz_db",
  password: "0ez69Kmpj197IIF3UEtMfULCz8zId23I",
  port: 5432,
  connectionString:
    "postgres://souq_3qaz_db_user:0ez69Kmpj197IIF3UEtMfULCz8zId23I@dpg-cms05ha1hbls73dr22eg-a.oregon-postgres.render.com/souq_3qaz_db",
  ssl: { rejectUnauthorized: false },
});

module.exports = { query: (text, params) => pool.query(text, params) };
