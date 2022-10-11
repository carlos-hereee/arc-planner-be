const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    uid: { type: String, required: true },
    type: { type: String, required: true },
    kingdomId: { type: String },
    userId: { type: String },
  },
  { timestamps: true }
);

const Applications = mongoose.model("application", applicationSchema);
module.exports = Applications;
