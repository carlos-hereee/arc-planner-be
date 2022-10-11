const router = require("express").Router();
// const Users = require("../models/users");
const Kingdoms = require("../models/kingdom");
const { v4: uuidv4 } = require("uuid");
const validateCookie = require("../middleware/validateCookie");
const { serversAreDown, successMessage } = require("./message.config");
router.get("/all", validateCookie, async (_, res) => {
  try {
    const data = await Kingdoms.find();
    res.status(200).json(data);
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ message: serversAreDown });
  }
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
    res.status(201).json({ message: successMessage });
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});

module.exports = router;
