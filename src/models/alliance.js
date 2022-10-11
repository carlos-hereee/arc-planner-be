const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allianceSchema = new Schema(
  {
    uid: { type: String, unique: true },
    name: { type: String },
    tag: { type: String },
    description: { type: String },
    kingdomId: { type: String },
    discordId: { type: Number },
  },
  { timestamps: true }
);

const Alliance = mongoose.model("alliance", allianceSchema);

module.exports = Alliance;
