const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
  name: 'invert',
  description: "invert effect on pfp",
  cooldown: 5,
  usage: 'invert, invert <user>',
   run: async (client, message, args) => {

            const { member, mentions } = message

                const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
              let xavatar = target.user.displayAvatarURL({dynamic: false, format: "png", size: 256})

        
                let ximage = await canva.Canvas.invert(xavatar)

                let xtriggered = new Discord.MessageAttachment(ximage, "inverted.png")

          
                    message.reply({files: [xtriggered]})
    }
}