const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  blog: {
    type: Schemas.Type.ObjectId,
    ref: "Blog"
  },
  user: {
    type: Schemas.Type.ObjectId,
    ref: "User"
  },
  comment: {
    type: String,
    required: true
  }
}, {timestamp: true})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
