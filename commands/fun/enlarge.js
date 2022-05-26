const { Message, Client, MessageEmbed, Util } = require('discord.js');
const ee = require('../../config/embed.json')
module.exports = {
   name: 'emoji',
   aliases: ['enlarge'],
   cooldown: 5,
   description: 'Enlarge an emoji!',
   category: "assets",
   usage: 'emoji <emoji>',
   /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
   run: async (client, message, args) => {
      if (!args.length) return message.channel.send(`**Please supply an emoji**`)
      const emoji = args[0]
      const parsedEmoji = Util.parseEmoji(emoji)
      if (parsedEmoji.id) {

         const exe = parsedEmoji.animated ? ".gif" : ".png"
         const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + exe}`
         const embed = new MessageEmbed()
            
            .setImage(url)
            .setColor(`${ee.color}`)
            .setFooter({
               text: `Emoji: ${parsedEmoji.name}\n${ee.footertext}`,
               iconURL: `${ee.footericon}`
             })
         message.channel.send({ embeds: [embed] })


      }
   }
}