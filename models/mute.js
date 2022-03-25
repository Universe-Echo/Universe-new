const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  Guild: String,
  User: String,
  MuteRole: String,
  RemovedRoles: Array,
  MutedOn: Number,
  Duration: Number,
});

const mutes = mongoose.model("muted-users", Schema);

module.exports = mutes;