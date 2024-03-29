require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const { expressjwt: jwt } = require("express-jwt");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const {
  uri,
  port,
  env,
  clientURL,
  accessTokenSecret,
} = require("./server.config");
const usersRouter = require("./src/router/users");
const kingdomRouter = require("./src/router/kingdom");

const app = express();
// express app
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.json());
app.use(cors({ credentials: true, origin: clientURL }));
app.use("/users", usersRouter);
app.use("/kingdom", kingdomRouter);
app.use(
  jwt({
    secret: accessTokenSecret,
    getToken: (req) => req.cookies.accessToken,
    algorithms: ["HS256"],
  })
);

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      if (env !== "production") {
        console.log(`\n*** Listening on port ${port}***\n`);
      }
    });
  })
  .catch((err) => {
    if (env !== "production") {
      console.log("err", err);
    }
  });

app.get("/", (req, res) => {
  res.status(202).send({
    name: "rok planner api",
    paths: ["/users/", "/alliance/"],
  });
});
