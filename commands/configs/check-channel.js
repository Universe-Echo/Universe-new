const Schema = require('../../models/welcomeChannel')

const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'check-welcome',
    description: 'check welcome channel',
    aliases: ['checkchannel', 'welcome-channel', 'welcomechannel', 'welcome-channel-check', 'welcome-channel-check'],
    cooldown: 5,
    userPermissions: ['ADMINISTRATOR'],
    usage: 'check-welcomeChannel',
    run: async (client, message, args) => {



        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {

            if (!data) return message.reply('**Welcome channel is not set yet**!')

            const channel = client.channels.cache.get(data.Channel);

            message.reply(`**Welcome channel => ${channel}**`)


        })

    }
}