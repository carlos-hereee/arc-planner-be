// generate token
const generateToken = (user, secret, length) => {
  return jwt.sign({ username: user.username, uid: user.uid }, secret, length);
};
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// generate tokens
const generateAccessToken = (user) => {
  return generateToken(user, accessTokenSecret, {
    expiresIn: "1d",
  });
};
const generateRefreshToken = (user) => {
  return generateToken(user, refreshTokenSecret, {
    expiresIn: "30d",
  });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshTokenSecret,
  accessTokenSecret,
};