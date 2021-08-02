require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();
const usersRouter = require("./router/users");

// express app
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/users", usersRouter);

// connect to mongodb
const dbURI = `mongodb+srv://${process.env.MG_USER}:${process.env.MG_PASSWORD}@cluster0.08fu7.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const port = process.env.PORT;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(port, () =>
      console.log(`\n*** Listening on port ${port}***\n`)
    )
  )
  .catch((err) => console.log("err", err));

server.get("/", (req, res) => {
  res.status(202).send({
    api: "Rise of Kingdoms api",
    paths: ["/users/", "/alliance/"],
  });
});
