const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogs.js");
const User = require("../models/user.js");

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length > 0) res.status(200).json(blogs);
  else res.status(200).json({ err: "there's no blogs currently" });
});

router.post("/blogs", async (req, res) => {
  const token = req.cookies.jwt;
  try {
    if (jwt) {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
        const user = await User.findById(decodedToken._id);
        if (user.isAdmin) {
          const { title, body } = req.body;
          const blog = new Blog({ title, body });
          await blog.save();
          res.status(200).json({ msg: "Blog Saved", ...blog });
        } else {
              res.status(401).json({ err: "User not authorized" });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ err: "something happend" });
  }
});

module.exports = router;
