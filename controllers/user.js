const User = require("../models/user");
const { generateJWT } = require("./jwt");

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.json({ user, message: "User successfully created" });
  } catch (error) {
    res.json({ error });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user === null) {
    return res.json({ message: "No such user" });
  }
  if (user.password === password) {
    const token = generateJWT(user);
    res.json({ token });
  } else {
    res.json({ message: "Wrong username or password" });
  }
};
