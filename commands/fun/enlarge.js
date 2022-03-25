const { Message, Client, MessageEmbed, Util } = require('discord.js');

module.exports = {
   name: 'emoji',
   aliases: ['enlarge'],
   cooldown: 5,
   description: 'Enlarge an emoji!',
   category: "assets",
   /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: (client, message, args) => {
    if(!args.length) return message.channel.send(`**Please supply an emoji**`)
    const emoji = args[0]
    const parsedEmoji = Util.parseEmoji(emoji)
    if(parsedEmoji.id) {
            
        const exe = parsedEmoji.animated ? ".gif" : ".png"
        const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + exe}`
         const embed = new MessageEmbed()
         .setFooter(`Emoji: ${parsedEmoji.name}`)
         .setImage(url)
         .setColor(client.color)

         message.channel.send({embeds: [embed]})

        
    }
 }
}