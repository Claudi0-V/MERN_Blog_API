const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
console.log(jwt);

router.get("/login", (req, res) => {
  res.status(200).json({ it: "works" });
});

const createToken = (_id) => {
  const maxAge = 3 * 24 * 60 * 60;
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hasUser = await User.findOne({ email });
    if (!!hasUser) {
      return res.status(401).json({ err: " User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      hashedPassword,
    });
    await user.save();
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({user: user._id});
  } catch (err) {
    res.status(401).json({ err: err });
  }
});

module.exports = router;
