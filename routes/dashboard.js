const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");

router.get("/me", authorize, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      req.user.id,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
});

module.exports = router;
