require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT_HOST || 8080;

app.use(cors());
app.use(express.json());

//routes
app.use("/authentication", require("./routes/jwtAuth"));

app.use("/auth", require("./routes/dashboard"));

app.listen(port, () => {
  console.log(`Server is starting on localhost:${port}`);
});
