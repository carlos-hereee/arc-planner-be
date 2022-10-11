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
    tier4Arc: { type: Number, default: 0 },
    tier4Cav: { type: Number, default: 0 },
    tier4Infa: { type: Number, default: 0 },
    tier5Arc: { type: Number, default: 0 },
    tier5Cav: { type: Number, default: 0 },
    tier5Infa: { type: Number, default: 0 },
    killPoints: { type: Number, default: 0 },
    power: { type: Number, default: 0 },
    dead: { type: Number, default: 0 },
    allianceId: { type: String },
    kingdomId: { type: String },
    discordId: { type: Number },
    isT5: { type: Boolean },
    isOnline: { type: Boolean },
    isBot: { type: Boolean },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
