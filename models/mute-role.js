const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  Guild: String,
  Role: String,
});

const muteRole = mongoose.model("mute-role", Schema);

module.exports = muteRole;
