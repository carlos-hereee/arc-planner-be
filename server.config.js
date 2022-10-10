const config = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  uri: process.env.DB_URI,
  port: process.env.PORT,
  env: process.env.DB_ENV,
  clientURL: process.env.CLIENT_URL,
  secret: process.env.ACCESS_TOKEN_SECRET,
};

module.exports = config;
