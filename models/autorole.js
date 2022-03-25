const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    Guild: String,
    ROLE: String,

})

module.exports = mongoose.model("autorole", Schema)