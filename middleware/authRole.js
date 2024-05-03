const jwt = require("jsonwebtoken");

function authAll(role) {
  return function (req, res, next) {
    const token = req.header("Authorization");
    // console.log(req.header("Authorization"));
    if (!token) {
      return res.status(403).send("Access denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).send("Forbidden.");
      }
      req.user = decoded;
      // console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      res.status(503).json({ message: "Session expired" });
    }
  };
}

module.exports = authAll;
