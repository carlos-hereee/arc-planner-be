require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();

// connect to mongodb
const dbURI = `mongodb+srv://${process.env.MG_USER}:${process.env.MG_PASSWORD}@cluster0.08fu7.mongodb.net/Cluster0?retryWrites=true&w=majority`;
const port = process.env.PORT || 04937;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => server.listen())
  .catch((err) => console.log("err", err));

server.use(express.static("./public"));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => res.send("index"));

server.listen(port, () => console.log(`\n*** Listening on port ${port}***\n`));
