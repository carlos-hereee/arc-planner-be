require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const usersRouter = require("./src/router/users");

// connect to mongodb
const uri = process.env.DB_URI;
const port = process.env.PORT;
const env = process.env.DB_ENV;
const clientURL = process.env.CLIENT_URL;

// express app
app.use(helmet());
app.use(cors({ credentials: true, origin: clientURL }));
app.use(express.json());

app.use("/users", usersRouter);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      if (env !== "production") {
        console.log(`\n*** Listening on port ${port}***\n`);
      }
    });
  })
  .catch((err) => console.log("err", err));

app.get("/", (req, res) => {
  res.status(202).send({
    name: "rok planner api",
    paths: ["/users/", "/alliance/"],
  });
});
