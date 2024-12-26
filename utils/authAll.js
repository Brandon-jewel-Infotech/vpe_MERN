const jwt = require("jsonwebtoken");

function authAll() {
  return function (req, res, next) {
    const token = req.header("Authorization");
    // console.log(req.header("Authorization"));
    if (!token) {
      return res.status(403).send("Access denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      // console.log(decoded);
      next();
    } catch (ex) {
      // console.log(ex);
      res.status(401).json({ message: "Session expired" });
    }
  };
}

module.exports = authAll;
