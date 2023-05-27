const router = require("express").Router();
const {
  comment_get_by_post_id,
  comment_get_by_id,
  comment_new,
  comment_edit,
  comment_delete,
} = require("../controllers/comment");
const {
  postUserPermission,
  commentUserPermission,
} = require("../controllers/jwt");
const {
  post_get_all,
  post_post_new,
  post_get_one,
  post_edit,
  post_delete,
} = require("../controllers/post");

router.route("/").get(post_get_all).post(post_post_new);
router
  .route("/:postID")
  .get(post_get_one)
  .put(postUserPermission, post_edit)
  .delete(postUserPermission, post_delete);
router
  .route("/:postID/comments/")
  .get(comment_get_by_post_id)
  .post(comment_new);
router
  .route("/:postID/comments/:commentID")
  .get(comment_get_by_id)
  .put(commentUserPermission, comment_edit)
  .delete(commentUserPermission, comment_delete);

module.exports = router;
