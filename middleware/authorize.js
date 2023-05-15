const jwt = require("jsonwebtoken");
require("dotenv").config();
import blackList from "../routes/jwtAuth";
module.exports = function (req, res, next) {
  const authorization = req.header("authorization");
  if (!authorization) {
    return res
      .status(403)
      .json({ status: 403, message: "Authorization denied" });
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const deathToken = blackList.filter(e => e.token = authorization)
  
  try {
    token = authorization.replace(/^Bearer\s/i, "");
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Token is not valid",
    });
  }
};
