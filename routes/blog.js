const router = require("express").Router();
const Blog = require("../models/blogs.js");
const User = require("../models/user.js");
const auth = require("../middleware/auth.js");

router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length > 0) res.status(200).json(blogs);
  else res.status(200).json({ err: "there's no blogs currently" });
});


router.post("/blogs", auth.jwt_auth, async (req, res) => {
  const {user, isAdmin} = req
  if (isAdmin) {
    const { title, body } = req.body;
    const blog = new Blog({ title, body });
    await blog.save();
    res.status(200).json({ msg: "Blog Saved", ...blog });
  } else {
    res.status(401).json({ err: "User not authorized" });
  }
});

module.exports = router;
