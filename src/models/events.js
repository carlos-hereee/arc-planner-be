const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    discordServerId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);
module.exports = { Events };
