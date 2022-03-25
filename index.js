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
const errchannel = '952060219830206534'
 process.on('unhandledRejection', (reason, p) => {
    console.log(' [Anti-Crash] ')
    console.log(reason, p)
    const errEmbed = new MessageEmbed()
    .setColor('DARK_BUT_NOT_BLACK')
    .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
    .setTitle('Error (unhandledRejection)')
    .setDescription(` \`\`\`\js\n${reason}\n\n${p} \`\`\`\ `)
    .setTimestamp()
    client.channels.cache.get(errchannel).send({embeds: [errEmbed]})
})
process.on('uncaughtException', (err, origin) => {
    console.log(' [Anti-Crash] ')
    console.log(err, origin)
    const errEmbed = new MessageEmbed()
    .setColor('DARK_BUT_NOT_BLACK')
    .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
    .setTitle('Error (uncaughtException)')
    .setDescription(` \`\`\`\js\n${err}\n\n${origin} \`\`\`\ `)
    .setTimestamp()
    client.channels.cache.get(errchannel).send({embeds: [errEmbed]})
})
process.on('multipleResolves', (type, promise, reason) => {
  console.log(' [Anti-Crash] ')
  console.log(type, promise, reason)
  const errEmbed = new MessageEmbed()
  .setColor('DARK_BUT_NOT_BLACK')
  .setAuthor(client.user.username, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
  .setTitle('Error (multipleResolves)')
  .setDescription(` \`\`\`\js\n${type}\n\n${promise}\n\n${reason} \`\`\`\ `)
  .setTimestamp()
  client.channels.cache.get(errchannel).send({embeds: [errEmbed]})
})


client.login(process.env.TOKEN);
