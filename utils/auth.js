const jwt = require("jsonwebtoken");

function auth(role) {
  return function (req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access denied. No token provided.");
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      // console.log(decoded);
      if (decoded.role !== role) {
        return res.status(403).send("Forbidden.");
      }
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(401).json({ message: "Session expired" });
    }
  };
}

module.exports = auth;
