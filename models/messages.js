const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    userID: String,
    messages: Number

})

module.exports = mongoose.model("messages", Schema)