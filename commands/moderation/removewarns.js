const db = require('../../models/warns')

const { Message, MessageEmbed } = require('discord.js')


module.exports = {
    name: 'removewarn',
    cooldown: 5,
    aliases: ['clearwarn', 'clearwarns', 'removewarns', 'remove-warn', 'remove-warns'],
userPermissions: ['BAN_MEMBERS'],
description: 'remove warns of a user',
usage: 'removewarn <user>',

    run: async (client, message, args) => {
  
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('**Please provide a user!**')

        db.find({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) return message.channel.send('**User has no warns!**')
            if(data) {
              await db.findOneAndDelete( {user: user.user.id, guildid: message.guild.id})
              message.channel.send(`**Removed all warns of ${user.user.tag}**`)

            }
        })
    }
}