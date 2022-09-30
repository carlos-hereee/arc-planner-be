const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    discordUserId: {
      type: Number,
      required: true,
    },
    discordServerId: {
      type: Number,
      required: true,
    },
    bot: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
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

const User = mongoose.model("User", userSchema);
const Events = mongoose.model("Events", eventSchema);

module.exports = { User, Events };
