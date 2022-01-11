const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  blogID: {
    type: Schema.Types.ObjectId,
    ref: "Blog"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  text: {
    type: String,
    required: true
  }
}, {timestamp: true})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
