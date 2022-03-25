const { reconDB } = require('reconlx')
require('dotenv').config()
const db = new reconDB(process.env.MONGOOSE)

module.exports = db;
