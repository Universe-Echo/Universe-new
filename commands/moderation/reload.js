
const { Client, Message, MessageEmbed } = require ("discord.js");
const glob = require("glob");
module.exports = {
name: "reload",
cooldown: 5,
/** 
* @param {Client} client
* @param {Message} message
* @param {String[]} args
*/
run: async (client , message, args) => {
if (message.author.id !== "673846605920600068") return message.channel.send('**This command can be only used by my owner!**')
client.commands.sweep(() => true)
glob(`${__dirname}/../**/*.js` , async (err, filePaths) => {
   if (err) return console.log(err);
   filePaths.forEach((file) => {
delete require.cache[require.resolve(file)];
const pull = require(file);
if(pull.name) {
   console.log(`Reloaded ${pull.name} (cmd)`);
   message.channel.send(`Reloaded ${pull.name} (cmd)`)
   client.commands.set(pull.name, pull);
}
if(pull.aliases && Array.isArray(pull.aliases)) {
   pull.aliases.forEach((alias) => {
       
  // client.aliases.set(alias, pull.name);
   });
}
   });
  
});

},
}