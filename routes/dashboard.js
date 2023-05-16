const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");
const getGeoInfo = require("../utils/getGeoInfo");
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
router.get("/geo-info", authorize, async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
    const data = await getGeoInfo(latitude, longitude);
    console.log(data);
    res.json({
      name: `${data.components.city_district}/${data.components.city}/${data.components.country}`,
      address: data.formatted,
      category: data.components._category,
      type: data.components._type,
      timezone: data.annotations.timezone.name,
      geometry: data.geometry,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
});

module.exports = router;
