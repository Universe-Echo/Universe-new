const Schema = require('../../models/welcomeChannel')

const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'check-channel',
    aliases: ['checkchannel', 'welcome-channel', 'welcomechannel', 'welcome-channel-check'],
    cooldown: 5,
    userPermissions: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
     


        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
     
if(!data) return message.reply('**Welcome channel is not set yet**!')

const channel = client.channels.cache.get(data.Channel);

message.reply(`**Welcome channel => ${channel}**`)


        })

    }
}