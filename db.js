require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "1",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "users",
});

module.exports = pool;
