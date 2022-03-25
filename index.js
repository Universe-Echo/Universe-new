const { Client, Collection, MessageEmbed } = require("discord.js");
require('dotenv').config()
const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

//error handler 
process.on("unhandledRejection", console.error);
process.on('uncaughtException', console.error)
process.on('multipleResolves', console.error)

client.login(process.env.TOKEN);
