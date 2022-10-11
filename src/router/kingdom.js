const router = require("express").Router();
// const Users = require("../models/users");
const Kingdoms = require("../models/kingdom");
const { v4: uuidv4 } = require("uuid");
const validateCookie = require("../middleware/validateCookie");

router.get("/", validateCookie, (req, res) => {
  // list all kingdoms
  // res.status(200).json(req.user);
});

router.post("/", validateCookie, async (req, res) => {
  const schema = {
    ...req.body,
    uid: uuidv4(),
    kingName: req.user.nickname,
    kingId: req.user.uid,
  };
  try {
    await new Kingdoms(schema).save();
    res.status(201).json({ message: "Succesfully created kingdom" });
  } catch {
    res.status(500).json({ message: "Servers are down try again later" });
  }
});

module.exports = router;
