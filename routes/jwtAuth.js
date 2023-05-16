const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
const jwt = require("jsonwebtoken");

//authorizeentication

router.post("/register", validInfo, async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.status(401).json({
        status: 401,
        message: "User already exist!",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    return res.status(200).json({
      status: 200,
      message: "Account has been register",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
});

router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        message: "Invalid Credential",
      });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({
        status: 401,
        message: "Invalid Credential",
      });
    }
    const token = jwtGenerator(user.rows[0].id);
    return res
      .cookie("token", token, { httpOnly: true })
      .json({ status: "Success", token: token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
});

router.get("/logout", authorize, async (req, res) => {
  const token = req.header("authorization");
  try {
    res.clearCookie("token");
    res
      .status(200)
      .json({ status: 200, message: "Your account has been logout" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
}),

router.post("/verify", authorize, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: 500,
        message: "Server error",
      });
    }
  });

module.exports = router;
