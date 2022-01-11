const router = require("express").Router();
const Comment = require("../models/comments.js");
const mongoose = require("mongoose");
const { jwt_auth } = require("../middleware/auth.js");

router.get("/", async (req, res) => {
  const blogID = req.body.blogID;
  try {
    const comments = await Comment.find({ blogID }).populate({
      path: "user",
      select: "username",
    });
    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", jwt_auth, async (req, res) => {
  const { text } = req.body;
  const blogID = req.body.blogID;
  const user = req.user._id;
  try {
    const comment = new Comment({ text, user, blogID });
    await comment.save();
    res.status(200).json({ msg: "comment saved" });
  } catch (err) {
    console.log(err);
    res.status(401).json("Failed to save comment");
  }
});

router.put("/", jwt_auth, async (req, res) => {
  const { user } = req;
  const { _id, newVersion } = req.body;
  try {
    const comment = await Comment.findOne({ _id });
    const isUserComment = comment.user.equals(user._id);
    if (isUserComment) {
      const updatedComment = await Comment.findByIdAndUpdate(
        { _id },
        { newVersion }
      );
      res.status(201).json({ sucess: "Comment succefuly updated" });
    } else {
      res.status(200).json({ err: "user don't match" });
    }
  } catch (err) {
    res.status(401).json("Failed to Update the comment");
  }
});

router.delete("/", jwt_auth, async (req, res) => {
  const { user } = req;
  const { _id } = req.body;
  try {
    const comment = await Comment.findOne({ _id });
    const isUserComment = comment.user.equals(user._id);
    if (isUserComment) {
      await Comment.findByIdAndDelete({ _id });
      res.status(200).json({ sucess: "Comment post deleted" });
    } else {
      res.status(200).json({ err: "user don't match" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ err: "Comment with this ID was not found" });
  }
});

module.exports = router;
