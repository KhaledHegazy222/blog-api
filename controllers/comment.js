const Comment = require("../models/comment");
const Post = require("../models/post");

exports.comment_get_by_post_id = async (req, res) => {
  const postId = req.params.postID;
  const commentsList = await Post.findOne(
    { _id: postId },
    { comments: 1, _id: 0 }
  ).populate("comments");
  return res.json(commentsList);
};

exports.comment_new = async (req, res) => {
  const postId = req.params.postID;
  const comment = await Comment.create({
    author: req.user.user.id,
    content: req.body.content,
  });
  const post = await Post.findOne({ _id: postId });
  post.comments.push(comment._id);
  await post.save();
  res.json(comment);
};

exports.comment_get_by_id = async (req, res) => {
  const commentID = req.params.commentID;
  const comment = await Comment.findOne({ _id: commentID }).populate("author", {
    username: 1,
  });
  if (comment === null) {
    return res.json({ error: "no such comment" });
  } else {
    return res.json(comment);
  }
};
exports.comment_edit = async (req, res) => {
  const commentID = req.params.commentID;
  const comment = await Comment.findOne({ _id: commentID });
  if (comment === null) {
    return res.json({ error: "no such comment" });
  }
  await comment
    .updateOne({
      content: req.body.content,
    })
    .exec();
  return res.json({ message: "Updated" });
};
exports.comment_delete = async (req, res) => {
  const postID = req.params.postID;
  const commentID = req.params.commentID;
  const comment = await Comment.findOne({ _id: commentID });
  if (comment === null) {
    return res.json({ error: "no such comment" });
  }
  
  const post = await Post.findOne({ _id: postID });
  post.comments = post.comments.filter((comment) => !comment.equals(commentID));
  await post.save();
  await comment.deleteOne();
  return res.json({ message: "Deleted" });
};
