const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "user not found" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = authenticate;
