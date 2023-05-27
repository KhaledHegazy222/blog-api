var express = require("express");
const { login, signup } = require("../controllers/user");
var router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

module.exports = router;
