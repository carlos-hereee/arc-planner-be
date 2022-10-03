const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLower = (str) => str.toLowerCase();

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, set: toLower },
    discordUserId: { type: Number },
    discordServerId: { type: Number },
    isOnline: { type: Boolean },
    bot: { type: Boolean },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
