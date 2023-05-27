const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const Comment = require("../models/comment");

const jwt_secret = process.env.JWT_SECRET;

exports.generateJWT = (user) => {
  return jwt.sign({ user }, jwt_secret);
};

exports.jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // unauthorized

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

exports.postUserPermission = (req, res, next) => {
  const postID = req.params.postID;
  const post = Post.findOne({ _id: postID });
  if (post.author !== req.user.user.id) {
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
exports.commentUserPermission = (req, res, next) => {
  const postID = req.params.postID;
  const post = Post.findOne({ _id: postID });
  if (post.author !== req.user.user.id) {
    res.status(401).json({ message: "Access Denied" });
  } else {
    next();
  }
};
