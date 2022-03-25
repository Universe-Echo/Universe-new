const db = require('../../models/warns')

const { Message, MessageEmbed } = require('discord.js')
const { execute } = require('../info/bot')

module.exports = {
    name: 'warns',
    cooldown: 5,
    userPermissions: ['BAN_MEMBERS'],
   run: async (client, message, args) => {
        

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!user) return message.channel.send('**Please provide a user!**')
const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(data === null) return message.channel.send(`**${user.user.tag} has no warns!**`)
           if(data.content.length) {

          const lol = data.content.map((w, i) => ` \n\`${i + 1}:-\`  **Moderator: \`${message.guild.members.cache.get(w.moderator).user.tag}\`  ||  Reason: \`${w.reason}\`**`)
          const warnsEmbed = new MessageEmbed() 
            .setTitle(`${user.user.tag}'s warns:`)
            .setColor("BLUE")
            .setThumbnail(user.user.displayAvatarURL({dynamic: true}))

            .setDescription(`${lol}`)
               message.channel.send({embeds: [warnsEmbed]})
               
            
               
                   
                 
           } else {
               message.channe.send('**User has no warns!**')
           }
          
        })
        
    }
}