const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guilds: String,
    Users: String,
    Channels: String
})

module.exports = mongoose.model('web', Schema)