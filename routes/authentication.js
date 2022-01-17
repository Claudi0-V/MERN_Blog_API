const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hasUser = await User.findOne({ email });
    if (hasUser) {
      return res.status(401).json({ err: " User Already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      hashedPassword,
    });
    await user.save();
    res.status(200).json({ mesg: "user created with success" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: err });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ err: "User with this email not found" });
  }
  const auth = bcrypt.compare(password, user.hashedPassword);
  if (!auth) {
    res.status(401).json({err:"Wrong password"})
  }
  if (auth) {
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", '', {maxAge: 1});
  res.status(200).json({succes: "User is not logged in anymore"})
})

module.exports = router;
