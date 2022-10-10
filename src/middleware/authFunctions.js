const jsonWebToken = require("jsonwebtoken");
const {
  accessTokenSecret,
  refreshTokenSecret,
} = require("../../server.config");

const generateToken = (user, secret, length) => {
  return jsonWebToken.sign(
    { username: user.username, uid: user.uid },
    secret,
    length
  );
};
const generateAccessToken = (user) => {
  return generateToken(user, accessTokenSecret, {
    expiresIn: "2d",
  });
};
const generateRefreshToken = (user) => {
  return generateToken(user, refreshTokenSecret, {
    expiresIn: "30d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
