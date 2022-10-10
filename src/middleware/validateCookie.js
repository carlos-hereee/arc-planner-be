const jsonWebToken = require("jsonwebtoken");
const { accessTokenSecret } = require("../../server.config");
const Users = require("../models/users");

module.exports = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(403).json({ accessToken: "" });
  }
  let payload = jsonWebToken.verify(token, accessTokenSecret);
  const user = await Users.findOne({
    $or: [{ username: payload.username }, { uid: payload.uid }],
  });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  } else {
    req.user = user;
    next();
  }
};
