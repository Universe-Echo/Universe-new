const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
   Status: String
})

module.exports = mongoose.model('onstatus', Schema)