const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kingdomSchema = new Schema(
  {
    uid: { type: String, unique: true },
    name: { type: String },
    discordId: { type: Number },
  },
  { timestamps: true }
);

const kingdom = mongoose.model("kingdom", kingdomSchema);

module.exports = kingdom;
