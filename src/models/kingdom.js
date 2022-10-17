const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kingdomSchema = new Schema(
  {
    uid: { type: String, unique: true },
    number: { type: Number },
    announcement: { type: String },
    kingName: { type: String },
    kingId: { type: String },
    discordId: { type: Number },
  },
  { timestamps: true }
);

const Kingdom = mongoose.model("kingdom", kingdomSchema);

module.exports = Kingdom;
