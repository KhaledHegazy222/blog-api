const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  content: { type: String, default: "Post Content", required: true },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    default: [],
  },
});

module.exports = mongoose.model("Post", PostSchema);
