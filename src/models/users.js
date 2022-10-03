const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toLower = (str) => str.toLowerCase();

const userSchema = new Schema(
  {
    uid: { type: String, unique: true },
    username: { type: String, required: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    email: { type: String, set: toLower },
    discordUserId: { type: Number },
    discordServerId: { type: Number },
    isOnline: { type: Boolean },
    isBot: { type: Boolean },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
