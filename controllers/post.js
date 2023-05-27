const Post = require("../models/post");
exports.post_get_all = async (req, res) => {
  const postsList = await Post.find()
    .populate("author", { username: 1 })
    .populate("comments");
  res.json({ posts: postsList });
};

exports.post_get_one = async (req, res) => {
  try {
    const postID = req.params.postID;
    const post = await Post.findOne({ _id: postID })
      .populate("author", {
        username: 1,
      })
      .populate("comments");
    if (post === null) {
      return res.json({ post: null, message: "No such post" });
    } else {
      return res.json({ post });
    }
  } catch (error) {
    return res.json({ post: null, error });
  }
};

exports.post_post_new = async (req, res) => {
  const { name, content } = req.body;
  const post = await Post.create({
    name,
    content,
    author: req.user.user._id,
  });
  res.json({ post });
};

exports.post_edit = async (req, res) => {
  const { content } = req.body;
  const postID = req.params.postID;
  const post = await Post.findOne({ _id: postID });
  if (post === null) {
    return res.json({ error: "no such post" });
  }
  await post.updateOne({ content }).exec();
  return res.json({ message: "updated" });
};

exports.post_delete = async (req, res) => {
  const postID = req.params.postID;
  const post = await Post.findOne({ _id: postID });
  if (post === null) {
    return res.json({ error: "no such post" });
  }
  await post.deleteOne();
  return res.json({ message: "deleted" });
};
