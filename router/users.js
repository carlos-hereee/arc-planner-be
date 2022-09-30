const router = require("express").Router();

router.post("/", async (req, res) => {
  console.log("req.body", req.body);
});

module.exports = router;
