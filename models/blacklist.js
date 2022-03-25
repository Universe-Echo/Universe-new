const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    Guild: String,
    Words: Array

})

module.exports = mongoose.model("blacklistedwords", Schema)
