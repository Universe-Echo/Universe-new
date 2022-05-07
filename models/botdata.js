const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Array: Array
})

module.exports = mongoose.model('botdata', Schema)