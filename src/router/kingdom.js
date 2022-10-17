const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const validateCookie = require("../middleware/validateCookie");
const { serversAreDown, successMessage } = require("./message.config");
const Users = require("../models/users");
const Kingdoms = require("../models/kingdom");
const Alliances = require("../models/alliance");
const Applications = require("../models/applications");

router.get("/all", validateCookie, async (_, res) => {
  try {
    const data = await Kingdoms.find();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.get("/:id", validateCookie, async (req, res) => {
  const kingdomId = req.params.id;
  try {
    const data = await Kingdoms.findOne({ uid: kingdomId });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.get("/user-application", validateCookie, async (req, res) => {
  try {
    const data = await Applications.find({
      userId: req.user.uid,
      type: "kingdom",
    });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.get("/search/:search", validateCookie, async (req, res) => {
  const { search } = req.params;
  try {
    const kingdomFilteredList = {
      alliance: await Alliances.find({ kingdomId: req.user.kingdomId }),
      members: await Users.find({ kingdomId: req.user.kingdomId }),
      applicants: await Applications.find({ kingdomId: req.user.kingdomId }),
    };
    res.status(200).json(kingdomFilteredList[search]);
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.get("/alliance/apply", validateCookie, async (req, res) => {
  try {
    const data = await Applications.find({
      kingdomId: req.user.kingdomId,
      userId: req.user.uid,
      type: "alliance",
    });
    res.status(200).json(data);
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});

router.post("/apply", validateCookie, async (req, res) => {
  const schema = {
    uid: uuidv4(),
    type: req.body.type,
    kingdomId: req.body.uid,
    userId: req.user.uid,
  };
  try {
    await new Applications(schema).save();
    res.status(201).json({ message: successMessage });
  } catch {
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
    await Users.updateOne(
      { uid: req.user.uid },
      { kingdomNumber: req.body.number },
      { kingdomId: schema.uid, isKing: true }
    );
    res.status(201).json({ message: successMessage });
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.post("/alliance", validateCookie, async (req, res) => {
  const schema = {
    ...req.body.values,
    uid: uuidv4(),
    kingdomId: req.user.kingdomId,
    kingdomNumber: req.user.kingdomNumber,
  };
  try {
    await new Alliances(schema).save();
    res.status(201).json({ message: successMessage });
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.post("/alliance/apply", validateCookie, async (req, res) => {
  const schema = {
    uid: uuidv4(),
    type: "alliance",
    kingdomId: req.user.kingdomId,
    userId: req.user.uid,
    allianceId: req.body.values.uid,
  };
  try {
    await new Applications(schema).save();
    res.status(201).json({ message: successMessage });
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.put("/filter", validateCookie, async (req, res) => {
  try {
    const kingdom = await Kingdoms.find();
    const filterList = kingdom.filter((kl) => {
      return (
        kl.name.match(req.body.search) ||
        kl.kingName.match(req.body.search) ||
        kl.announcement.match(req.body.search)
      );
    });
    res.status(200).json(filterList);
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});
router.delete("/user-application/:id", validateCookie, async (req, res) => {
  const data = {
    userId: req.user.uid,
    type: "kingdom",
    kingdomId: req.params.id,
  };
  try {
    await Applications.deleteOne(data);
    res.status(200).json({ message: successMessage });
  } catch {
    res.status(500).json({ message: serversAreDown });
  }
});

module.exports = router;
