const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    uid: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    kingdomId: { type: String },
    allianceId: { type: String },
    discordId: { type: Number, required: true },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);
module.exports = { Events };
