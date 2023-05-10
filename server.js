const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
//middleware
// const pool = require("./db");
app.use(cors());
app.use(express.json());

//routes

app.use("/authentication", require("./routes/jwtAuth"));

app.use("/auth", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`Server is starting on localhost:${port}`);
});

// app.get('/users', async (req, res) => {
//   const client = await pool.connect();
//   try {
//     const result = await client.query('SELECT * FROM users');
//     res.send(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal server error');
//   } finally {
//     client.release();
//   }
// });
