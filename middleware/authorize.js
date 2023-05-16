const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  const authorization = req.header("cookie");
  if (!authorization) {
    return res
      .status(403)
      .json({ status: 403, message: "Authorization denied" });
  }
  try {
    let token = authorization.replace('token=', '');
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
