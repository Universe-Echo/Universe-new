const { Client, MessageEmbed, Message } = require('discord.js')
const Schema = require('../../models/autorole')
module.exports = {
    name: 'autorole-check',
    cooldown: 5,
    description: 'check autorole of the server',
userPermissions: ['MANAGE_ROLES'],
botPermissions: ['ADMINISTRATOR'],
usage: 'autorole-check',
   run: async (client, message, args) => {
        if (!message.member.guild.me.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('**I dont have the perms to do this!**')
        }

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send('**You dont have the perms to do this!**')

        }
        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
     
            if(!data) return message.reply('**Autorole is not set yet**!')
            
           const role = (data.ROLE)
            const roleEmbed = new MessageEmbed()
            .setDescription(`**Autorole => <@&${role}>**`)
            message.reply({embeds: [roleEmbed]})
            
            
                    })
     


    }
}