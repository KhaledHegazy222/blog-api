const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
