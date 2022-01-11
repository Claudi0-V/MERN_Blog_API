const User = require("../models/user.js");

const jwt = require("jsonwebtoken");

module.exports.jwt_auth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        const user = await User.findById(decodedToken._id);
        if (!user) {
          res.status(401).json({ err: "user not found" });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(400).json({ err: "User not authorized" });
    }
  } catch (err) {
    res.status(400).json({ err: "something happend" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ err: "User not authorized" });
  }
};
