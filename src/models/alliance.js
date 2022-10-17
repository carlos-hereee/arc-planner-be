const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allianceSchema = new Schema(
  {
    uid: { type: String, unique: true },
    name: { type: String },
    tag: { type: String },
    announcement: { type: String },
    kingdomId: { type: String },
    kingdomNumber: { type: Number },
    discordId: { type: Number },
  },
  { timestamps: true }
);

const Alliances = mongoose.model("alliance", allianceSchema);

module.exports = Alliances;
