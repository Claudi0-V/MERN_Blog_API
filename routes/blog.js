const router = require("express").Router();
const Blog = require("../models/blogs.js");
const User = require("../models/user.js");
const { jwt_auth, isAdmin } = require("../middleware/auth.js");

router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  if (blogs.length > 0) res.status(200).json(blogs);
  else res.status(200).json({ err: "there's no blogs currently" });
});

router.post("/", jwt_auth, isAdmin, async (req, res) => {
  const { user, isAdmin } = req;
  const { title, body } = req.body;
  const blog = new Blog({ title, body });
  await blog.save();
  res.status(200).json({ msg: "Blog Saved" });
});

router.delete("/", jwt_auth, isAdmin, async (req, res) => {
  const { user } = req;
  const _id = req.body;
  try {
    const blog = await Blog.findByIdAndDelete(_id);
    res.status(200).json({ sucess: "Blog post deleted" });
  } catch (err) {
    res.status(401).json({ err: "Blog with this ID was not found" });
  }
});

router.put("/", jwt_auth, isAdmin, async (req, res) => {
  const { user } = req;
  const { _id, post } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate({ _id }, post );
    res.status(201).json({ sucess: "Blog succefuly updated", blog });
  } catch (err) {
    res.status(401).json({ err: "Blog with this ID was not found" });
  }
});

module.exports = router;
