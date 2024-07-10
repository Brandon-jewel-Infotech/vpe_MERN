const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findByPk(decodedToken.userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = authenticate;
