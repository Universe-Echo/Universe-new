const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "status",
  aliases: ['presence', 'activity'],
  cooldown: 10,
  devOnly: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
// STREAMING, WATCHING, CUSTOM_STATUS, PLAYING, COMPETING
const name = args.slice(1).join(' ')
if (!name) return message.reply('**Please provide a name for the activity!**')

const type = args[0]
if(!type) return message.reply('**Please provide a activity type**')

if (type === 'playing') {
    client.user.setActivity(`${name}`,{
        status: "dnd", // or any other status type
        activity: `${name}`, // Change this ofc
        type: "PLAYING" // or any other type or activity
        })
    message.reply(`Client's activity set to:\nType: ${type}\nName: ${name}`)
}
   
else if (type === 'watching') {
    client.user.setActivity(`${name}`,{
        status: "online", // or any other status type
        activity: `${name}`, // Change this ofc
        type: "WATCHING" // or any other type or activity
        })
    message.reply(`Client's activity set to:\nType: ${type}\nName: ${name}`)
}
    
else if(type === 'streaming') {

    url = args[1]
    name2 = args.slice(2).join(' ')
    if (!url) return message.channel.send("**PLease provide a url for the streaming activity!**")

    client.user.setActivity(`${name2}`, {
        type: "STREAMING",
        url: `${url}`
      })
    message.reply(`Client's activity set to:\nType: ${type}\nName: ${name2}\nURL: ${url}`)
}




  },
};