const Pool = require("pg").Pool;

const pool = new Pool({
  host: "127.0.0.1",
  user: "postgres",
  password: "1",
  port: 5432,
  database: "users",
});

module.exports = pool;
